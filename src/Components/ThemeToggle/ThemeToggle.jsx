import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ className = '' }) => {
    const [isDark, setIsDark] = useState(false);
    
    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);
    
    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        
        const theme = newTheme ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
    
    return (
        <motion.button
            className={`relative w-16 h-8 bg-base-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${className}`}
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            animate={{
                backgroundColor: isDark ? '#1f2937' : '#e5e7eb',
            }}
            transition={{ duration: 0.3 }}
        >
            {/* Toggle background glow */}
            <motion.div
                className="absolute inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full"
                animate={{
                    opacity: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Toggle circle */}
            <motion.div
                className="relative w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden"
                animate={{
                    x: isDark ? 32 : 0,
                    backgroundColor: isDark ? '#10b981' : '#ffffff',
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {/* Sun Icon */}
                <motion.div
                    animate={{
                        rotate: isDark ? 180 : 0,
                        scale: isDark ? 0 : 1,
                        opacity: isDark ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    <FiSun className="w-4 h-4 text-yellow-500" />
                </motion.div>
                
                {/* Moon Icon */}
                <motion.div
                    animate={{
                        rotate: isDark ? 0 : -180,
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    <FiMoon className="w-4 h-4 text-white" />
                </motion.div>
            </motion.div>
            
            {/* Outer glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                animate={{
                    opacity: isDark ? 0.4 : 0,
                    scale: isDark ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
};

export default ThemeToggle;