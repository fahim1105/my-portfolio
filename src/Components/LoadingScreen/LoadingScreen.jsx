import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [terminalLine, setTerminalLine] = useState("");

    const logs = [
        "INITIALIZING_CORE_SYSTEMS",
        "ESTABLISHING_SECURE_HANDSHAKE",
        "SYNCING_NEURAL_INTERFACE",
        "LOADING_REACT_DOM_FRAGMENTS",
        "COMPILING_STYLIZED_COMPONENTS",
        "OPTIMIZING_RENDER_PIPELINE",
        "SYSTEM_READY_V2.0.4"
    ];

    // Background code snippets for the "hacker/dev" effect
    const codeLines = [
        "import { motion } from 'framer-motion';",
        "const [data, setData] = useState(null);",
        "useEffect(() => { fetchAPI(); }, []);",
        "export default function App() { ... }",
        "npm install tailwindcss lucide-react",
        "git push origin main --force",
        "while(isLoading) { renderLoader(); }",
        "const response = await api.get('/user');",
        "01001010 01000001 01010110 01000101",
        "system.compile({ target: 'production' });",
        "Object.keys(payload).map(key => ...)",
        "console.log('System Operational');"
    ];

    useEffect(() => {
        const totalDuration = 2500; 
        const intervalTime = totalDuration / 100;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onLoadingComplete(), 200);
                    return 100;
                }
                const logIdx = Math.floor((prev / 100) * logs.length);
                setTerminalLine(logs[logIdx]);
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(40px)", transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] overflow-hidden font-mono text-white"
        >
            {/* --- Advanced Background Coding Matrix --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15] flex justify-between px-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-4 text-[9px] md:text-[11px] text-primary font-bold">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * -20
                            }}
                            className="flex flex-col gap-8"
                        >
                            {/* repeating the code lines to create a stream */}
                            {[...codeLines, ...codeLines].map((line, idx) => (
                                <span key={idx} className="whitespace-nowrap opacity-60">
                                    {line}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* --- Overlay Gradient for Depth --- */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] z-0 pointer-events-none" />

            {/* --- Grid/Dots Effect --- */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            
            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,4px_100%] opacity-30"></div>

            {/* --- Main Center Content --- */}
            <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Name with Glitch */}
                <motion.div className="relative">
                    <h1 className="text-3xl md:text-6xl font-black tracking-[0.2em] mb-2 relative z-10">
                        ASIF AL FATTHA FAHIM
                    </h1>
                    <motion.h1 
                        animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 2 }}
                        className="absolute inset-0 text-primary md:text-6xl font-black tracking-[0.2em] blur-sm select-none"
                    >
                        ASIF AL FATTHA FAHIM
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, letterSpacing: "1em" }}
                        animate={{ opacity: 1, letterSpacing: "0.5em" }}
                        transition={{ duration: 1 }}
                        className="text-[10px] md:text-xs text-primary font-bold uppercase mt-4 mb-20"
                    >
                        Developing Digital Excellence
                    </motion.p>
                </motion.div>

                {/* Progress Module */}
                <div className="w-[280px] md:w-[500px] relative">
                    <div className="flex justify-between items-end mb-3 px-1">
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-[8px] text-white/20 uppercase tracking-[3px]">Process_Log</span>
                            <AnimatePresence mode="wait">
                                <motion.span 
                                    key={terminalLine}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="text-[10px] font-bold text-primary/90 uppercase"
                                >
                                    {">"} {terminalLine}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <span className="text-xl md:text-2xl font-black italic">
                            {progress}<span className="text-[10px] not-italic text-primary ml-1">%</span>
                        </span>
                    </div>
                    
                    {/* The Premium Bar */}
                    <div className="h-[2px] w-full bg-white/5 rounded-full relative overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <motion.div 
                            className="absolute h-full left-0 top-0 bg-gradient-to-r from-transparent via-primary to-primary shadow-[0_0_20px_#10b981]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Corner HUD Frames */}
            <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
            <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />

        </motion.div>
    );
};

export default LoadingScreen;