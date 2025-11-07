import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AS</span>
          </div>
          <h1 className="text-xl font-bold">Arya.social</h1>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          
          <Link to="/create">
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </Link>

          <Link to={`/profile/${user.id}`}>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </Link>

          <div className="flex items-center space-x-2">
            <Link to={`/profile/${user.id}`}>
              <Avatar
                src={user.avatar}
                fallback={`${user.firstName[0]}${user.lastName[0]}`}
                size="sm"
              />
            </Link>
            
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
