#!/bin/bash

# Social Media App Deployment Script
set -e

# Configuration
ENVIRONMENT=${1:-production}
AWS_REGION=${AWS_REGION:-us-east-1}
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPOSITORY_BACKEND="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/social-media-backend"
ECR_REPOSITORY_FRONTEND="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/social-media-frontend"

echo "🚀 Deploying Social Media App to ${ENVIRONMENT} environment"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

# Create ECR repositories if they don't exist
echo "📦 Setting up ECR repositories..."
aws ecr describe-repositories --repository-names social-media-backend --region ${AWS_REGION} > /dev/null 2>&1 || \
    aws ecr create-repository --repository-name social-media-backend --region ${AWS_REGION}

aws ecr describe-repositories --repository-names social-media-frontend --region ${AWS_REGION} > /dev/null 2>&1 || \
    aws ecr create-repository --repository-name social-media-frontend --region ${AWS_REGION}

# Login to ECR
echo "🔐 Logging into ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# Build and push backend image
echo "🏗️ Building backend Docker image..."
cd ../backend
docker build -t social-media-backend .
docker tag social-media-backend:latest ${ECR_REPOSITORY_BACKEND}:latest
docker tag social-media-backend:latest ${ECR_REPOSITORY_BACKEND}:$(git rev-parse --short HEAD)

echo "📤 Pushing backend image to ECR..."
docker push ${ECR_REPOSITORY_BACKEND}:latest
docker push ${ECR_REPOSITORY_BACKEND}:$(git rev-parse --short HEAD)

# Build and push frontend image
echo "🏗️ Building frontend Docker image..."
cd ../frontend
docker build -t social-media-frontend .
docker tag social-media-frontend:latest ${ECR_REPOSITORY_FRONTEND}:latest
docker tag social-media-frontend:latest ${ECR_REPOSITORY_FRONTEND}:$(git rev-parse --short HEAD)

echo "📤 Pushing frontend image to ECR..."
docker push ${ECR_REPOSITORY_FRONTEND}:latest
docker push ${ECR_REPOSITORY_FRONTEND}:$(git rev-parse --short HEAD)

# Deploy infrastructure
echo "🏗️ Deploying AWS infrastructure..."
cd ../deployment

# Check if stack exists
if aws cloudformation describe-stacks --stack-name ${ENVIRONMENT}-social-media-infrastructure --region ${AWS_REGION} > /dev/null 2>&1; then
    echo "📝 Updating existing CloudFormation stack..."
    aws cloudformation update-stack \
        --stack-name ${ENVIRONMENT}-social-media-infrastructure \
        --template-body file://aws-infrastructure.yml \
        --parameters ParameterKey=Environment,ParameterValue=${ENVIRONMENT} \
                    ParameterKey=DBPassword,ParameterValue=${DB_PASSWORD:-ChangeMe123!} \
        --capabilities CAPABILITY_IAM \
        --region ${AWS_REGION}
    
    aws cloudformation wait stack-update-complete \
        --stack-name ${ENVIRONMENT}-social-media-infrastructure \
        --region ${AWS_REGION}
else
    echo "🆕 Creating new CloudFormation stack..."
    aws cloudformation create-stack \
        --stack-name ${ENVIRONMENT}-social-media-infrastructure \
        --template-body file://aws-infrastructure.yml \
        --parameters ParameterKey=Environment,ParameterValue=${ENVIRONMENT} \
                    ParameterKey=DBPassword,ParameterValue=${DB_PASSWORD:-ChangeMe123!} \
        --capabilities CAPABILITY_IAM \
        --region ${AWS_REGION}
    
    aws cloudformation wait stack-create-complete \
        --stack-name ${ENVIRONMENT}-social-media-infrastructure \
        --region ${AWS_REGION}
fi

# Get stack outputs
echo "📋 Getting infrastructure details..."
VPC_ID=$(aws cloudformation describe-stacks \
    --stack-name ${ENVIRONMENT}-social-media-infrastructure \
    --query 'Stacks[0].Outputs[?OutputKey==`VPCId`].OutputValue' \
    --output text \
    --region ${AWS_REGION})

DB_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name ${ENVIRONMENT}-social-media-infrastructure \
    --query 'Stacks[0].Outputs[?OutputKey==`DatabaseEndpoint`].OutputValue' \
    --output text \
    --region ${AWS_REGION})

S3_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name ${ENVIRONMENT}-social-media-infrastructure \
    --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
    --output text \
    --region ${AWS_REGION})

ALB_DNS=$(aws cloudformation describe-stacks \
    --stack-name ${ENVIRONMENT}-social-media-infrastructure \
    --query 'Stacks[0].Outputs[?OutputKey==`LoadBalancerDNS`].OutputValue' \
    --output text \
    --region ${AWS_REGION})

ECS_CLUSTER=$(aws cloudformation describe-stacks \
    --stack-name ${ENVIRONMENT}-social-media-infrastructure \
    --query 'Stacks[0].Outputs[?OutputKey==`ECSClusterName`].OutputValue' \
    --output text \
    --region ${AWS_REGION})

echo "✅ Infrastructure deployed successfully!"
echo "🌐 Application URL: http://${ALB_DNS}"
echo "🗄️ Database Endpoint: ${DB_ENDPOINT}"
echo "🪣 S3 Bucket: ${S3_BUCKET}"

echo "🚀 Deployment completed successfully!"
echo ""
echo "Next steps:"
echo "1. Set up your domain and SSL certificate"
echo "2. Configure ECS services using the provided task definitions"
echo "3. Run database migrations"
echo "4. Update DNS records to point to: ${ALB_DNS}"
