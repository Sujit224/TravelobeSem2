import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {/* Full Stars */}
      {Array(fullStars).fill().map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-current" />
      ))}

      {/* Half Star with Outline */}
      {hasHalfStar && (
        <div className="relative w-5 h-5">
          {/* Star Outline */}
          <Star className="w-5 h-5 text-yellow-400" />
          {/* Half Filled */}
          <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
            <Star className="w-5 h-5 fill-current text-yellow-400" />
          </div>
        </div>
      )}

      {/* Empty Stars - Only Outlined */}
      {Array(emptyStars).fill().map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-400" />
      ))}
    </div>
  );
};

export default StarRating;
