import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  showText?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  onChange,
  readOnly = false,
  showText = false,
  className
}: StarRatingProps) {
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={cn(
              "transition-colors",
              !readOnly && "cursor-pointer",
              (hover || rating) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300",
              readOnly && "cursor-default"
            )}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
      {showText && rating > 0 && (
        <span className="text-sm text-muted-foreground ml-1 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
