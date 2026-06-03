import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

// Cache so the same page slug isn't fetched twice during a session
const seoCache = {};

export const useSeo = (pageSlug) => {
    const [seo, setSeo] = useState(seoCache[pageSlug] || null);

    useEffect(() => {
        if (!pageSlug) return;

        // Already cached — no need to fetch again
        if (seoCache[pageSlug]) {
            setSeo(seoCache[pageSlug]);
            return;
        }

        fetch(`${API}/seo/${pageSlug}`)
            .then(r => r.json())
            .then(data => {
                if (data && (data.title || data.description || data.ogImage)) {
                    seoCache[pageSlug] = data;
                    setSeo(data);
                }
            })
            .catch(() => { }); // Fail silently — fallback defaults handle it
    }, [pageSlug]);

    return seo;
};
