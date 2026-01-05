import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import HeroCard from '../Components/HeroCard/HeroCard';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-base-200 overflow-x-hidden">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* --- Navbar Section --- 
                   মোবাইলে: একদম উপরে সেটে থাকবে (px-0)।
                   ডেস্কটপে: কার্ডের ওপর ওভারল্যাপ করবে।
                */}
                <aside className="w-full lg:w-fit z-50 order-1 lg:sticky lg:top-0 lg:h-screen flex items-center lg:mr-25 p-0">
                    <div className="w-full">
                        <Navbar />
                    </div>
                </aside>

                <main className="flex-1 w-full order-2 lg:h-screen pb-8 md:pb-12 lg:pb-0 overflow-y-auto lg:overflow-visible">
                    <div className="h-full">
                        <div className="lg:h-screen bg-base-200">
                            {/* মোবাইলে py-0 এবং px-0 ব্যবহার করা হয়েছে যাতে কোনো গ্যাপ না থাকে */}
                            <div className="max-w-7xl mx-auto py-0 md:py-12 lg:py-10 px-0 md:px-8 lg:px-4 grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8 lg:gap-10 h-full items-start lg:items-center">

                                {/* --- HeroCard Section --- */}
                                <div className="lg:col-span-4 w-full md:max-w-xl md:mx-auto lg:max-w-none lg:h-[88vh] z-10 p-0 md:p-2">
                                    <HeroCard />
                                </div>

                                {/* --- Content Section (Outlet) --- */}
                                <div className="lg:col-span-8 bg-base-100 rounded-none md:rounded-4xl shadow-2xl h-full lg:h-[88vh] overflow-y-auto no-scrollbar border-none md:border border-base-300 md:max-w-4xl md:mx-auto lg:mx-0 w-full transition-all duration-300">
                                    <div className="p-6 md:p-10 lg:p-12">
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