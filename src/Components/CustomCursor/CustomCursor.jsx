import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    // Motion values for cursor position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Smooth spring animation to follow real cursor - faster and smoother
    const springConfig = { stiffness: 600, damping: 35, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    
    // Track mouse movement and update custom cursor position
    const handleMouseMove = useCallback((e) => {
        cursorX.set(e.clientX - 14); // Center the 28px cursor
        cursorY.set(e.clientY - 14);
        setIsVisible(true);
    }, [cursorX, cursorY]);
    
    // Detect hover on interactive elements
    const handleElementInteraction = useCallback((e) => {
        const target = e.target;
        const isInteractive = target.closest('a, button, [role="button"], .cursor-pointer, .project-card, .btn, .button');
        setIsHovering(!!isInteractive);
    }, []);
    
    useEffect(() => {
        // Check for touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;
        
        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleElementInteraction, { passive: true });
        document.addEventListener('mouseenter', () => setIsVisible(true), { passive: true });
        document.addEventListener('mouseleave', () => setIsVisible(false), { passive: true });
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleElementInteraction);
            document.removeEventListener('mouseenter', () => setIsVisible(true));
            document.removeEventListener('mouseleave', () => setIsVisible(false));
        };
    }, [handleMouseMove, handleElementInteraction]);
    
    // Don't render on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
    
    return (
        <>
            {/* Custom cursor that follows real cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    opacity: { duration: 0.05 }
                }}
            >
                {/* Normal state - filled circle */}
                {!isHovering && (
                    <motion.div
                        className="w-7 h-7 rounded-full bg-primary"
                        style={{
                            opacity: 0.7,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.08,
                            ease: "easeOut"
                        }}
                    />
                )}
                
                {/* Hover state - large circle ring */}
                {isHovering && (
                    <motion.div
                        className="w-15 h-15 rounded-full border-2 border-primary"
                        style={{
                            opacity: 0.6,
                            width: '60px',
                            height: '60px',
                            marginLeft: '-16px',
                            marginTop: '-16px',
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.08,
                            ease: "easeOut"
                        }}
                    />
                )}
            </motion.div>
        </>
    );
};

export default CustomCursor;