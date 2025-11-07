import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { postsService } from '../../services/posts';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import toast from 'react-hot-toast';

interface PostCardProps {
  post: Post;
  onUpdate?: (updatedPost: Post) => void;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post._count.likes);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    
    try {
      const response = await postsService.toggleLike(post.id);
      setIsLiked(response.data.isLiked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    setLoading(true);
    try {
      await postsService.deletePost(post.id);
      toast.success('Post deleted successfully');
      onDelete?.(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  const isOwner = user?.id === post.author.id;

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${post.author.id}`}>
              <Avatar
                src={post.author.avatar}
                fallback={`${post.author.firstName[0]}${post.author.lastName[0]}`}
                size="md"
              />
            </Link>
            <div>
              <Link 
                to={`/profile/${post.author.id}`}
                className="font-semibold hover:underline"
              >
                {post.author.firstName} {post.author.lastName}
              </Link>
              <p className="text-sm text-muted-foreground">
                @{post.author.username} · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          {isOwner && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              
              {showMenu && (
                <div className="absolute right-0 top-8 z-10 w-48 rounded-md border bg-popover p-1 shadow-md">
                  <Link to={`/posts/${post.id}/edit`}>
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    size="sm"
                    onClick={handleDelete}
                    loading={loading}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed mb-4">{post.content}</p>
        
        {post.imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={post.imageUrl}
              alt="Post image"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        <div className="flex items-center space-x-4 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`space-x-2 ${isLiked ? 'text-red-500' : ''}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          
          <Link to={`/posts/${post.id}`}>
            <Button variant="ghost" size="sm" className="space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>{post._count.comments}</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
