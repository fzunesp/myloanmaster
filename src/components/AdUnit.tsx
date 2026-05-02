import { useEffect, useRef } from 'react';
import { Box } from '@mantine/core';

interface AdUnitProps {
  adSlot: string;
  format?: 'auto' | 'rectangle' | 'leaderboard';
  className?: string;
}

export default function AdUnit({ adSlot, format = 'auto', className }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const win = window as typeof window & { adsbygoogle?: unknown[] };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, []);

  const formatStyles: Record<string, React.CSSProperties> = {
    auto: { display: 'block' },
    rectangle: { display: 'inline-block', width: '300px', height: '250px' },
    leaderboard: { display: 'inline-block', width: '728px', height: '90px' },
  };

  return (
    <Box
      ref={adRef}
      className={className}
      style={{
        textAlign: 'center',
        margin: '1.5rem 0',
        padding: '0.75rem',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(30, 41, 59, 0.25)',
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          ...formatStyles[format],
          maxWidth: '100%',
          overflow: 'hidden',
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </Box>
  );
}
