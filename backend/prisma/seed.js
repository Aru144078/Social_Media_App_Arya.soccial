const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      bio: 'Software developer passionate about building great apps.',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      username: 'janesmith',
      firstName: 'Jane',
      lastName: 'Smith',
      bio: 'Designer and creative thinker.',
      password: hashedPassword,
    },
  });

  // Create demo posts
  const post1 = await prisma.post.create({
    data: {
      content: 'Welcome to our new social media platform! Excited to share and connect with everyone.',
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      content: 'Just finished working on a new design project. Love how creativity flows when you\'re passionate about what you do! 🎨',
      authorId: user2.id,
    },
  });

  // Create demo comments
  await prisma.comment.create({
    data: {
      content: 'Great to have you here! Looking forward to your posts.',
      userId: user2.id,
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Your designs are always inspiring! Can\'t wait to see what you create next.',
      userId: user1.id,
      postId: post2.id,
    },
  });

  // Create demo likes
  await prisma.like.create({
    data: {
      userId: user2.id,
      postId: post1.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user1.id,
      postId: post2.id,
    },
  });

  // Create demo follow relationship
  await prisma.follow.create({
    data: {
      followerId: user1.id,
      followingId: user2.id,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Demo users:');
  console.log('- john@example.com (password: password123)');
  console.log('- jane@example.com (password: password123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
