import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';

// Reduced particle count and simplified animations for better performance
const ParticleBackground = () => {
    // Tech icons — reduced to 5, stable random values via useMemo
    const techIcons = useMemo(() => {
        const icons = [
            { Icon: FaReact, name: 'React', x: 5, y: 15 },
            { Icon: FaJs, name: 'JavaScript', x: 15, y: 30 },
            { Icon: SiTailwindcss, name: 'Tailwind', x: 8, y: 50 },
            { Icon: FaNodeJs, name: 'Node.js', x: 14, y: 68 },
            { Icon: SiMongodb, name: 'MongoDB', x: 9, y: 84 },
        ];
        return icons.map((icon, i) => ({
            ...icon,
            id: i,
            duration: 22 + i * 3,
            delay: i * 1.5,
            size: 17 + i,
        }));
    }, []);

    // Reduced to 20 particles (was 60)
    const particles = useMemo(() => {
        const seed = [
            [8,12],[22,45],[55,8],[78,30],[35,60],[90,15],[12,75],[65,50],
            [45,85],[30,20],[70,70],[18,40],[85,55],[50,25],[5,90],[40,5],
            [95,80],[25,65],[60,35],[80,90],
        ];
        return seed.map(([x, y], i) => ({
            id: i,
            x, y,
            size: 1.5 + (i % 3),
            opacity: 0.15 + (i % 4) * 0.07,
            duration: 25 + (i % 5) * 4,
            delay: i * 0.7,
            moveY: 18 + (i % 4) * 5,
        }));
    }, []);

    // Reduced to 3 orbs (was 5)
    const orbs = useMemo(() => [
        { id: 0, x: 5,  y: 10, size: 120, duration: 28, delay: 0 },
        { id: 1, x: 30, y: 45, size: 100, duration: 34, delay: 4 },
        { id: 2, x: 10, y: 75, size: 90,  duration: 40, delay: 8 },
    ], []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Floating particles — transform-only animations for GPU compositing */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-primary"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity,
                        willChange: 'transform',
                    }}
                    animate={{ y: [0, -p.moveY, 0] }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: p.delay,
                    }}
                />
            ))}

            {/* Tech Icons */}
            {techIcons.map((tech) => (
                <motion.div
                    key={`tech-${tech.id}`}
                    className="absolute text-primary select-none hidden sm:block"
                    style={{
                        left: `${tech.x}%`,
                        top: `${tech.y}%`,
                        fontSize: `${tech.size}px`,
                        opacity: 0.6,
                        willChange: 'transform',
                        filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))',
                    }}
                    animate={{
                        y: [0, -8, 0],
                        rotate: tech.name === 'React' ? [0, 360] : [0, 4, -4, 0],
                    }}
                    transition={{
                        duration: tech.duration,
                        repeat: Infinity,
                        ease: tech.name === 'React' ? 'linear' : 'easeInOut',
                        delay: tech.delay,
                    }}
                >
                    <tech.Icon />
                </motion.div>
            ))}

            {/* Gradient orbs — slow, subtle, GPU-composited */}
            {orbs.map((orb) => (
                <motion.div
                    key={`orb-${orb.id}`}
                    className="absolute rounded-full bg-primary/8 blur-3xl"
                    style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        willChange: 'transform',
                    }}
                    animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: orb.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;