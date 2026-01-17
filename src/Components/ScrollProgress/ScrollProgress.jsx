import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    
    // Smooth spring animation for the progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Progress Bar Container */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-base-300/30 backdrop-blur-sm">
                {/* Animated Progress Line */}
                <motion.div
                    className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary origin-left"
                    style={{ scaleX }}
                />
            </div>

            {/* Optional: Glowing effect */}
            <div className="fixed top-0 left-0 right-0 z-40 h-1">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 origin-left blur-sm"
                    style={{ scaleX }}
                />
            </div>
        </>
    );
};

export default ScrollProgress;