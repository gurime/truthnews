'use client'
import React, { useEffect, useRef, useState } from 'react';

interface AdComponentProps {
  articleId: string;
}

const AdComponent: React.FC<AdComponentProps> = ({ articleId }) => {
const [error, setError] = useState<string | null>(null);
const [adLoaded, setAdLoaded] = useState(false);
const adContainerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
const loadAdScript = () => {
const script = document.createElement('script');
script.async = true;
script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`;
script.crossOrigin = "anonymous";
script.onload = initAd;
script.onerror = () => setError('AdSense script loading failed');
document.head.appendChild(script);
};

if (typeof window !== 'undefined') {
if (!(window as any).adsbygoogle) {
loadAdScript();
} else {
initAd();
}
}

return () => {
// Clean up if needed
};
}, [articleId]);

const initAd = () => {
if (!adContainerRef.current) return;

try {
// Clear previous ad content
adContainerRef.current.innerHTML = '';
// Create new ins element
const ins = document.createElement('ins');
ins.className = 'adsbygoogle';
ins.style.display = 'block';
ins.style.minHeight = '100px';
ins.setAttribute('data-ad-client', process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '');
ins.setAttribute('data-ad-slot', '9723262299');
ins.setAttribute('data-ad-format', 'auto');
ins.setAttribute('data-full-width-responsive', 'true');
ins.setAttribute('data-article-id', articleId);

// Append ins to container
adContainerRef.current.appendChild(ins);

// Push ad
try {
((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
} catch (err) {
console.error('AdSense push error:', err);
setError('Failed to push ad');
return;
}

setAdLoaded(true);
} catch (err) {
console.error('AdSense initialization error:', err);
setError('Failed to initialize AdSense');
}
};

useEffect(() => {
const checkAdLoaded = () => {
if (adContainerRef.current && adContainerRef.current.innerHTML === '' && !adLoaded) {
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

return <div ref={adContainerRef} />;
};

export default AdComponent;