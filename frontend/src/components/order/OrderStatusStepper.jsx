import React from 'react';
import { Check } from 'lucide-react';
import { ORDER_STATUSES } from '../../utils/constants';

const STEP_ORDER = ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

export default function OrderStatusStepper({ currentStatus }) {
  const isFailed = currentStatus === 'FAILED';
  const isCancelled = currentStatus === 'CANCELLED';
  const isTerminal = isFailed || isCancelled;
  const currentStepIndex = STEP_ORDER.indexOf(currentStatus);

  return (
    <div className="py-4">
      <div className="flex items-start justify-between relative">
        {STEP_ORDER.map((status, index) => {
          const config = ORDER_STATUSES[status];
          const isCompleted = !isTerminal && currentStepIndex > index;
          const isActive = !isTerminal && currentStepIndex === index;

          return (
            <div key={status} className="flex flex-col items-center flex-1 relative">
              {/* Connector */}
              {index < STEP_ORDER.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2 transition-colors duration-500 ${
                    isCompleted ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
                  }`}
                />
              )}

              {/* Circle */}
              <div
                className={`
                  relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${isCompleted ? 'bg-[var(--color-primary)] text-white' : ''}
                  ${isActive ? 'bg-[var(--color-text-primary)] text-[var(--color-surface)] ring-4 ring-[var(--color-border)]' : ''}
                  ${!isCompleted && !isActive ? 'bg-[var(--color-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]' : ''}
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span>{config.icon}</span>}
              </div>

              {/* Label */}
              <p className={`mt-2 text-[9px] font-semibold text-center leading-tight max-w-[56px] uppercase tracking-wide ${
                isActive ? 'text-[var(--color-text-primary)]' :
                isCompleted ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
              }`}>
                {config.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Terminal Status */}
      {isTerminal && (
        <div className={`mt-4 p-3 rounded-xl text-center ${
          isFailed ? 'bg-[color-mix(in_srgb,var(--color-error)_10%,var(--color-surface))]' : 'bg-[var(--color-elevated)]'
        }`}>
          <span className="text-lg mr-1">{ORDER_STATUSES[currentStatus]?.icon}</span>
          <span className={`text-sm font-bold ${isFailed ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]'}`}>
            {ORDER_STATUSES[currentStatus]?.label}
          </span>
        </div>
      )}
    </div>
  );
}
