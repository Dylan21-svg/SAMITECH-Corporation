import { useState } from 'react';
import { Network } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'SAMITECH Infrastructure',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#060814] via-[#0000B8] to-[#950606] text-white p-6 text-center ${className}`}
      >
        <Network className="w-8 h-8 text-[#DBEAFE] mb-3" aria-hidden="true" />
        <span className="text-sm font-medium tracking-tight text-white/95">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
