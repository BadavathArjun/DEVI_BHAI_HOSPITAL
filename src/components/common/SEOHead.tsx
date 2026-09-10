import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description?: string;
  canonicalPath?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = "Devibai Super Speciality Hospital in Nirmal, Telangana provides fertility & IVF, maternity, pediatric, surgical, laparoscopic, urology, emergency and critical care services.",
  canonicalPath
}) => {
  useEffect(() => {
    // Update document title
    const fullTitle = title.includes('Devibai') 
      ? title 
      : `${title} | Devibai Super Speciality Hospital Nirmal`;
    document.title = fullTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update OpenGraph title and description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update canonical if given
    if (canonicalPath) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://devibaihospital.com${canonicalPath}`);
      }
    }
  }, [title, description, canonicalPath]);

  return null;
};
