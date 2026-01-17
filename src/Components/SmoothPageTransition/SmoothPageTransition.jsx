import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

const SmoothPageTransition = ({ children }) => {
    const location = useLocation();
    const { scrollToTop } = useSmoothScroll();

    useEffect(() => {
        // Smooth scroll to top on route change
        scrollToTop();
    }, [location.pathname, scrollToTop]);

    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
                duration: 0.4, 
                ease: "easeInOut",
                type: "tween"
            }}
        >
            {children}
        </motion.div>
    );
};

export default SmoothPageTransition;