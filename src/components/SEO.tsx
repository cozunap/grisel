import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  schema?: string;
}

export default function SEO({ title, description, canonical, keywords, schema }: SEOProps) {
  const fullTitle = `${title} | Grisel Beauty Spa`;
  const siteUrl = 'https://griselbeautyspa.com';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Grisel Beauty Spa" />
      {canonical && <meta property="og:url" content={`${siteUrl}${canonical}`} />}

      {/* Structured Data (Schema.org) JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}
    </Helmet>
  );
}
