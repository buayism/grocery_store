import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import StarRating from './StarRating';
import Button from '../common/Button';

export default function ReviewForm({ onSubmit, loading = false }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, comment: comment.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3 block">
          Overall Experience
        </label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      {/* Comment */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5 block">
          Additional Notes
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us more about your experience..."
          rows={4}
          className="input-base resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={rating === 0 || loading}
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-sm font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Submit Feedback
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
