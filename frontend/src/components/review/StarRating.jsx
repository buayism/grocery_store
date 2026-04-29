import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value = 0, onChange, size = 'md', readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-10 h-10' };
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              disabled={readOnly}
              onClick={() => onChange?.(star)}
              onMouseEnter={() => !readOnly && setHovered(star)}
              onMouseLeave={() => !readOnly && setHovered(0)}
              className={`transition-all duration-150 ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
            >
              <Star
                className={`${sizes[size]} transition-colors duration-150 ${
                  isFilled ? 'fill-[var(--color-accent-yellow)] text-[var(--color-accent-yellow)]' : 'fill-none text-[var(--color-border)]'
                }`}
              />
            </button>
          );
        })}
      </div>
      {!readOnly && (hovered || value) > 0 && (
        <p className="text-xs text-[var(--color-text-muted)] animate-fade-in">
          {labels[hovered || value]}
        </p>
      )}
    </div>
  );
}
