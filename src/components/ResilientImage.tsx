import { useEffect, useRef, useState } from 'react';
import { Network } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackTitle?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  darkSkeleton?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  wrapperClassName = 'relative w-full h-full',
  fallbackTitle = 'SAMITECH Infrastructure',
  priority = false,
  width,
  height,
  darkSkeleton = false,
}: ResilientImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${wrapperClassName} flex flex-col items-center justify-center bg-gradient-to-br from-[#060814] via-[#0000B8] to-[#950606] text-white p-6 text-center ${className}`}
      >
        <Network className="w-8 h-8 text-[#DBEAFE] mb-3" strokeWidth={1.75} aria-hidden="true" />
        <span className="text-sm font-medium tracking-tight text-white/95">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <div className={`${wrapperClassName} overflow-hidden`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            darkSkeleton ? 'skeleton-shimmer-dark' : 'skeleton-shimmer'
          }`}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
