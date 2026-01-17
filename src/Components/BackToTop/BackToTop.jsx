import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();
    const { scrollToTop } = useSmoothScroll();

    // Show button when scrolled down 300px
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: isVisible ? 1 : 0, 
                scale: isVisible ? 1 : 0 
            }}
            whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 btn btn-circle btn-lg bg-primary hover:bg-primary/90 border-none text-white shadow-lg"
            style={{ display: isVisible ? 'flex' : 'none' }}
        >
            <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            >
                <HiArrowUp size={24} />
            </motion.div>
        </motion.button>
    );
};

export default BackToTop;