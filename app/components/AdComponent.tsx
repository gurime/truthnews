'use client'
import React, { useEffect, useRef, useState } from 'react';

interface AdComponentProps {
  articleId: string;
}

const AdComponent: React.FC<AdComponentProps> = ({ articleId }) => {
  const [error, setError] = useState<string | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadAdSenseScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0757101243908749";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        try {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
          setAdLoaded(true);
        } catch (err) {
          console.error('AdSense push error:', err);
          setError('Failed to initialize AdSense');
        }
      };
      script.onerror = (err) => {
        console.error('AdSense script loading error:', err);
        setError('AdSense script loading failed');
      };
      document.head.appendChild(script);
    };

    loadAdSenseScript();

    return () => {
      const script = document.querySelector(`script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const checkAdLoaded = () => {
      if (adRef.current && adRef.current.innerHTML === '' && !adLoaded) {
        console.warn('Ad container is empty. Possible ad blocker or loading issue.');
        setError('Ad failed to load. Please disable ad blocker or try again later.');
      }
    };

    const timeoutId = setTimeout(checkAdLoaded, 2000);

    return () => clearTimeout(timeoutId);
  }, [adLoaded]);

  if (error) {
    return <div className="ad-fallback">Advertisement placeholder</div>;
  }

  return (
    <div
      ref={adRef}
      key={articleId}
      className="adsbygoogle"
      style={{ display: 'block', minHeight: '100px' }}
      data-ad-client="ca-pub-0757101243908749"
      data-ad-slot="9723262299"
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-article-id={articleId}
    />
  );
};

export default AdComponent;