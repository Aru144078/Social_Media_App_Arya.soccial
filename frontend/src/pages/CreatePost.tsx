import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '../components/posts/CreatePostForm';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const handlePostCreated = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>
      
      <CreatePostForm onPostCreated={handlePostCreated} />
    </div>
  );
};

export default CreatePost;
