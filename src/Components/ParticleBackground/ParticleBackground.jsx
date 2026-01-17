import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';

const ParticleBackground = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Tech icons with glowing effect - positioned on left side of card
    const techIcons = useMemo(() => {
        const icons = [
            { Icon: FaReact, name: 'React', x: 5, y: 15 },
            { Icon: FaJs, name: 'JavaScript', x: 15, y: 25 },
            { Icon: SiTailwindcss, name: 'Tailwind', x: 8, y: 35 },
            { Icon: FaHtml5, name: 'HTML5', x: 12, y: 45 },
            { Icon: FaCss3Alt, name: 'CSS3', x: 6, y: 55 },
            { Icon: FaNodeJs, name: 'Node.js', x: 14, y: 65 },
            { Icon: SiMongodb, name: 'MongoDB', x: 9, y: 75 },
            { Icon: FaGitAlt, name: 'Git', x: 11, y: 85 },
        ];
        
        return icons.map((icon, i) => ({
            ...icon,
            id: i,
            duration: Math.random() * 15 + 20, // 20-35s
            delay: Math.random() * 8,
            size: Math.random() * 8 + 16, // 16-24px (smaller)
        }));
    }, []);

    // Floating particles
    const particles = useMemo(() => {
        const particleCount = 60;
        const newParticles = [];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1, // 1-4px
                opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
                duration: Math.random() * 25 + 20, // 20-45s
                delay: Math.random() * 15,
                moveX: Math.random() * 15 - 7.5,
                moveY: Math.random() * 25 + 15,
            });
        }

        return newParticles;
    }, []);

    // Gradient orbs
    const orbs = useMemo(() => {
        return [...Array(5)].map((_, i) => ({
            id: i,
            x: (i * 20) + Math.random() * 15,
            y: (i * 18) + Math.random() * 20,
            size: 80 + Math.random() * 60,
            duration: 25 + i * 6,
            delay: i * 3,
        }));
    }, []);

    // Hide on small screens
    useEffect(() => {
        const checkMobile = () => {
            setIsVisible(window.innerWidth >= 480);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-primary"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                        boxShadow: '0 0 6px rgba(16, 185, 129, 0.4)',
                    }}
                    animate={{
                        y: [0, -particle.moveY, 0],
                        x: [0, particle.moveX, 0],
                        scale: [1, 1.2, 1],
                        opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.delay,
                    }}
                />
            ))}

            {/* Tech Icons - Small, positioned on left side */}
            {techIcons.map((tech) => (
                <motion.div
                    key={`tech-${tech.id}`}
                    className="absolute text-primary select-none"
                    style={{
                        left: `${tech.x}%`,
                        top: `${tech.y}%`,
                        fontSize: `${tech.size}px`,
                        filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))',
                        textShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                        opacity: 0.7,
                    }}
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 0.9, 0.7],
                        rotate: tech.name === 'React' ? [0, 360] : [0, 3, -3, 0],
                    }}
                    transition={{
                        duration: tech.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: tech.delay,
                        rotate: tech.name === 'React' ? 
                            { duration: 25, repeat: Infinity, ease: "linear" } : 
                            { duration: tech.duration, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <tech.Icon />
                </motion.div>
            ))}

            {/* Gradient orbs for depth */}
            {orbs.map((orb) => (
                <motion.div
                    key={`orb-${orb.id}`}
                    className="absolute rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-2xl"
                    style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        x: [0, 8, 0],
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: orb.delay,
                    }}
                />
            ))}

            {/* Corner accent particles - reduced and repositioned */}
            <motion.div
                className="absolute top-12 left-20 w-2 h-2 bg-primary rounded-full"
                style={{ 
                    opacity: 0.5,
                    boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            <motion.div
                className="absolute bottom-24 left-16 w-1.5 h-1.5 bg-primary rounded-full"
                style={{ 
                    opacity: 0.6,
                    boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)'
                }}
                animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute top-1/3 left-5 w-1.5 h-1.5 bg-primary/60 rounded-full"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            {/* Connecting lines - left side only */}
            <motion.div
                className="absolute top-1/4 left-12 w-px h-16 bg-gradient-to-b from-primary/15 to-transparent"
                animate={{
                    scaleY: [1, 1.2, 1],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-2/3 left-8 w-12 h-px bg-gradient-to-r from-primary/15 to-transparent"
                animate={{
                    scaleX: [1, 1.2, 1],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
        </div>
    );
};

export default ParticleBackground;