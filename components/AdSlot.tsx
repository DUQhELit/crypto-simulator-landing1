import React from 'react';

export interface AdSlotProps {
  /** Unique identifier for the ad slot */
  slotId: string;
  /** Array of supported sizes, where the first is used as the default container size */
  sizes: [number, number][];
  className?: string;
}

/**
 * AdSlot component reserves space for Google AdSense ads to avoid CLS.  The
 * actual ad script should be loaded client-side via the Google AdSense
 * snippet using your publisher ID.  Until then, this component displays
 * a placeholder labeled "Advertisement".
 */
const AdSlot: React.FC<AdSlotProps> = ({ slotId, sizes, className }) => {
  const [width, height] = sizes[0];
  return (
    <div
      id={`ad-slot-${slotId}`}
      className={`relative flex items-center justify-center bg-gray-900 text-gray-500 text-xs border border-gray-700 ${className || ''}`}
      style={{ width, height }}
    >
      <span>Advertisement</span>
    </div>
  );
};

export default AdSlot;