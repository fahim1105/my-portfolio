import { Outlet, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import HeroCard from '../Components/HeroCard/HeroCard';
import ScrollProgress from '../Components/ScrollProgress/ScrollProgress';
import BackToTop from '../Components/BackToTop/BackToTop';
import SmoothPageTransition from '../Components/SmoothPageTransition/SmoothPageTransition';
import ParticleBackground from '../Components/ParticleBackground/ParticleBackground';

const RootLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-base-200 overflow-x-hidden relative">
            {/* Particle Background */}
            <ParticleBackground />
            
            {/* Scroll Progress Bar */}
            <ScrollProgress />
            
            <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

                {/* --- Navbar Section --- */}
                <aside className="w-full lg:w-fit z-50 order-1 lg:sticky lg:top-0 lg:h-screen flex items-center lg:mr-25 p-0">
                    <div className="w-full">
                        <Navbar />
                    </div>
                </aside>

                <main className="flex-1 w-full order-2 lg:h-screen pb-8 md:pb-12 lg:pb-0 overflow-y-auto lg:overflow-visible">
                    <div className="h-full">
                        <div className="lg:h-screen bg-base-200">
                            <div className="max-w-7xl mx-auto py-0 md:py-12 lg:py-10 px-0 md:px-8 lg:px-4 grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8 lg:gap-10 h-full items-start lg:items-center">

                                {/* --- HeroCard Section --- */}
                                <div className="lg:col-span-4 w-full md:max-w-xl md:mx-auto lg:max-w-none lg:h-[88vh] z-10 p-0 md:p-2">
                                    <HeroCard />
                                </div>

                                {/* --- Content Section (Outlet) with Page Transitions --- */}
                                <div className="lg:col-span-8 bg-base-100 rounded-none md:rounded-4xl h-full lg:h-[88vh] overflow-y-auto no-scrollbar border-none md:border border-base-300 md:max-w-4xl md:mx-auto lg:mx-0 w-full transition-all duration-300">
                                    <div className="p-6 md:p-10 lg:p-12">
                                        <AnimatePresence mode="wait">
                                            <SmoothPageTransition key={location.pathname}>
                                                <div className="space-y-10">
                                                    <Outlet />
                                                </div>
                                            </SmoothPageTransition>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Back to Top Button */}
            <BackToTop />
        </div>
    );
};

export default RootLayout;
