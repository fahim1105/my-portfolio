import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import HeroCard from '../Components/HeroCard/HeroCard';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="flex flex-col lg:flex-row min-h-screen relative">

                {/* Navbar: মোবাইলে ও ট্যাবলেটে উপরে থাকবে, ডেস্কটপে বামে */}
                <aside className="w-full lg:w-fit my-auto z-50 order-1">
                    <Navbar />
                </aside>

                <main className="flex-1 w-full order-2 lg:h-screen pb-8 md:pb-12 lg:pb-0">
                    <div className="h-full">
                        <div className="lg:h-screen bg-base-200 overflow-x-hidden">

                            {/* Grid Layout Logic: 
                                md (tablet): grid-cols-1 থাকবে কিন্তু max-w কিছুটা বাড়বে।
                                lg (desktop): grid-cols-12 এ ফিরে যাবে। */}
                            <div className="max-w-4xl lg:max-w-6xl mx-auto py-6 md:py-10 lg:py-10 px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 h-full items-stretch">

                                {/* HeroCard Section: 
                                    ট্যাবলেটে এটি ফুল উইডথ থাকবে কিন্তু হাইট কিছুটা কন্ট্রোল করা হয়েছে। */}
                                <div className="lg:col-span-4 h-full md:max-w-2xl md:mx-auto lg:max-w-none lg:mx-0">
                                    <HeroCard />
                                </div>

                                {/* Content Section (Outlet): 
                                    ট্যাবলেটে বর্ডার এবং প্যাডিং অ্যাডজাস্ট করা হয়েছে। */}
                                <div className="lg:col-span-8 bg-base-100 rounded-[32px] shadow-sm h-full overflow-y-auto no-scrollbar shadow-inner relative border border-base-300 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0">

                                    <div className="p-6 md:p-8 lg:p-10">
                                        <div className="space-y-10">
                                            <Outlet />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default RootLayout;