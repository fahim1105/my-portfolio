import { Helmet } from 'react-helmet-async';
import { useSeo } from '../../hooks/useSeo';

/**
 * Drop this component at the top of any page.
 * 
 * Props:
 *   slug        — matches the page slug stored in DB (e.g. 'home', 'projects')
 *   defaultTitle       — fallback title if DB has nothing
 *   defaultDescription — fallback description if DB has nothing
 *   defaultOgImage     — fallback OG image if DB has nothing
 */
const PageSeo = ({ slug, defaultTitle, defaultDescription, defaultOgImage = '' }) => {
    const seo = useSeo(slug);

    const title       = seo?.title       || defaultTitle;
    const description = seo?.description || defaultDescription;
    const ogImage     = seo?.ogImage     || defaultOgImage;
    const siteUrl     = 'https://asif-al-fattha-fahim.pages.dev';

    return (
        <Helmet>
            {/* Basic */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph — Facebook, WhatsApp, LinkedIn */}
            <meta property="og:title"       content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type"        content="website" />
            <meta property="og:url"         content={siteUrl} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter Card */}
            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:title"       content={title} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Helmet>
    );
};

export default PageSeo;
