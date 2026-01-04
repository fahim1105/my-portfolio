import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { HiOutlineMailOpen } from 'react-icons/hi';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                setStatus("SUCCESS");
                setLoading(false);
                e.target.reset();
                setTimeout(() => setStatus(""), 5000); // ৫ সেকেন্ড পর মেসেজ চলে যাবে
            }, (error) => {
                console.log("Failed...", error);
                setStatus("ERROR");
                setLoading(false);
            });
    };

    return (
        <section className="bg-base-100 text-base-content py-5 px-0 md:px-10 lg:py-10 md:my-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-200 p-6 md:p-12 rounded-[32px] shadow-2xl border border-white/5"
            >
                {/* --- Left Side: Info --- */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-primary italic">C</span>ontact
                    </h2>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <h3 className="text-xl font-semibold opacity-90">Get in touch</h3>
                    </div>
                    <p className="text-secondary-content/70 mb-8 leading-relaxed">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>

                    <div className="hidden lg:flex items-center gap-4 text-primary text-6xl opacity-20">
                        <HiOutlineMailOpen />
                    </div>
                </div>

                {/* --- Right Side: Form --- */}
                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Your name</label>
                            <input type="text" name="name" required placeholder="John Doe" className="input input-bordered w-full bg-base-100 focus:border-primary transition-all duration-300 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Your email</label>
                            <input type="email" name="email" required placeholder="name@example.com" className="input input-bordered w-full bg-base-100 focus:border-primary transition-all duration-300 rounded-xl" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Subject</label>
                        <input type="text" name="title" required placeholder="Project Inquiry" className="input input-bordered w-full bg-base-100 focus:border-primary transition-all duration-300 rounded-xl" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Your message</label>
                        <textarea name="message" required placeholder="How can I help you?" className="textarea textarea-bordered w-full bg-base-100 h-32 focus:border-primary transition-all duration-300 rounded-xl"></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-full tracking-[3px] text-white font-bold rounded-xl transition-all duration-500 ${loading ? 'opacity-50' : 'hover:shadow-[0_0_20px_rgba(var(--p),0.4)]'}`}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "SEND MESSAGE"}
                    </button>

                    {/* Status Messages */}
                    <div className="min-h-[24px]">
                        {status === "SUCCESS" && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success text-center text-sm font-bold">
                                ✓ Message sent successfully!
                            </motion.p>
                        )}
                        {status === "ERROR" && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-error text-center text-sm font-bold">
                                ✕ Error sending message. Please try again.
                            </motion.p>
                        )}
                    </div>
                </form>
            </motion.div>
        </section>
    );
};

export default Contact;