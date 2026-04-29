import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { FAILURE_MESSAGES } from '../../utils/constants';
import Button from '../common/Button';

export default function FailureReasonBanner({ reason, onAction }) {
  const config = FAILURE_MESSAGES[reason];
  if (!config) return null;

  return (
    <div className="p-4 bg-[color-mix(in_srgb,var(--color-error)_8%,var(--color-surface))] border border-[color-mix(in_srgb,var(--color-error)_20%,var(--color-border))] rounded-xl animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--color-error)_15%,var(--color-surface))] flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-[var(--color-error)]" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-[var(--color-error)]">{config.title}</h4>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">{config.message}</p>
          {onAction && (
            <Button variant="danger" size="sm" className="mt-3" onClick={onAction}>
              {config.action}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
