import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, size = 'md', className }) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div className={cn('relative flex shrink-0 overflow-hidden rounded-full', sizes[size], className)}>
      {src ? (
        <img
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={alt || 'Avatar'}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallbackElement = target.nextElementSibling as HTMLElement;
            if (fallbackElement) {
              fallbackElement.style.display = 'flex';
            }
          }}
        />
      ) : null}
      <div
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
          src ? 'hidden' : 'flex'
        )}
      >
        {fallback}
      </div>
    </div>
  );
};

export default Avatar;
