import React, { useEffect } from 'react';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

export interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, any> | Record<string, any>[];
}

const DEFAULT_DESCRIPTION =
  "Devibai Super Speciality Hospital (Devi Bai Hospital) is the best hospital and top fertility & IVF centre in Nirmal, Telangana. 24/7 emergency care, maternity, laparoscopic surgery & ICU facilities beside DS Mart, Mancherial Road.";

const DEFAULT_KEYWORDS =
  "best fertility hospital in nirmal, best fertility center in nirmal, best hospital in nirmal, devi bai hospital, devi bai hospital nirmal, devi bai super specility hospital nirmal, devibai super speciality hospital nirmal, devi bhai hospital, devi bhai super speciality hospital, best ivf center in nirmal, fertility clinic in nirmal, test tube baby center nirmal, dr chandrika fertility centre nirmal, dr chandrika nirmal, multi speciality hospital in nirmal, maternity hospital nirmal, gynecologist nirmal dr chandrika, laparoscopic surgery nirmal, emergency hospital nirmal 24/7, aarogyasri hospital nirmal, hospital beside ds mart mancherial road nirmal";

const BASE_URL = 'https://devibaihospital.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/branding/homepage-hero.jpg`;

/**
 * Advanced SEO Head Component
 * Dynamically updates document title, primary meta tags, Open Graph, Twitter Cards,
 * local geo tags, and injects Schema.org JSON-LD structured data into document.head.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  breadcrumbs,
  schema
}) => {
  useEffect(() => {
    // 1. Title
    const cleanTitle = title.trim();
    const fullTitle = cleanTitle.includes('Devibai') || cleanTitle.includes('Devi Bai')
      ? cleanTitle
      : `${cleanTitle} | Devibai Super Speciality Hospital Nirmal`;
    document.title = fullTitle;

    // Helper to find or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setMetaTag('name', 'author', 'Devibai Super Speciality Hospital');

    // 3. Canonical URL
    const canonicalUrl = canonicalPath
      ? `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
      : `${BASE_URL}/`;
    
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 4. Local SEO Geo Tags
    setMetaTag('name', 'geo.region', 'IN-TG');
    setMetaTag('name', 'geo.placename', 'Nirmal, Telangana, India');
    setMetaTag('name', 'geo.position', '19.0968;78.3444');
    setMetaTag('name', 'ICBM', '19.0968, 78.3444');

    // 5. OpenGraph Tags
    const fullImageUrl = image.startsWith('http')
      ? image
      : `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:site_name', 'Devibai Super Speciality Hospital');
    setMetaTag('property', 'og:locale', 'en_IN');

    // 6. Twitter Card Tags
    setMetaTag('property', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'twitter:url', canonicalUrl);
    setMetaTag('property', 'twitter:title', fullTitle);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:image', fullImageUrl);

    // 7. Dynamic JSON-LD Structured Data Injection
    const schemaGraphItems: Record<string, any>[] = [];

    // Auto-generate BreadcrumbList if breadcrumbs provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraphItems.push(generateBreadcrumbSchema(breadcrumbs));
    }

    // Add custom schema(s) if provided
    if (schema) {
      if (Array.isArray(schema)) {
        schemaGraphItems.push(...schema);
      } else {
        schemaGraphItems.push(schema);
      }
    }

    // Inject into dedicated script tag if there are items to render
    const scriptId = 'page-schema-ld-json';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schemaGraphItems.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      // Structure as Schema.org graph
      const graphData = {
        '@context': 'https://schema.org',
        '@graph': schemaGraphItems
      };
      scriptTag.text = JSON.stringify(graphData, null, 2);
    } else if (scriptTag) {
      // Remove stale schema script if this page has none
      scriptTag.remove();
    }

    return () => {
      // Clean up page schema on component unmount to prevent leaks
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, image, type, noindex, breadcrumbs, schema]);

  return null;
};
