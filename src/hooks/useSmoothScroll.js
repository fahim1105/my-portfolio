import { useCallback } from 'react';

export const useSmoothScroll = () => {
    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const scrollToElement = useCallback((elementId, offset = 0) => {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    const scrollToSection = useCallback((sectionName, offset = 100) => {
        // For internal page sections
        const element = document.querySelector(`[data-section="${sectionName}"]`);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    return {
        scrollToTop,
        scrollToElement,
        scrollToSection
    };
};