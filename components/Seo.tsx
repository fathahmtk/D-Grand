import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
}

const upsertMeta = (name: string, content: string, property = false) => {
  const selector = property ? `meta[property='${name}']` : `meta[name='${name}']`;
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    if (property) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const Seo = ({ title, description, keywords }: SeoProps) => {
  useEffect(() => {
    document.title = `${title} | D Grand Jewellery`;
    upsertMeta('description', description);
    upsertMeta('keywords', keywords || 'D Grand Jewellery, fashion jewellery, imitation jewellery India');
    upsertMeta('og:title', `${title} | D Grand Jewellery`, true);
    upsertMeta('og:description', description, true);
    upsertMeta('robots', 'index, follow');
  }, [title, description, keywords]);

  return null;
};

export default Seo;
