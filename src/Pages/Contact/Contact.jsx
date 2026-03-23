import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { useToast } from '../../Context/ToastContext';

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useToast();

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { name, email, title, message } = Object.fromEntries(new FormData(form.current));

        try {
            // Save to DB
            await fetch(`${API}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, title, message }),
            });

            // Send via EmailJS
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            e.target.reset();
            showSuccess("🎉 Message sent successfully! I'll get back to you soon.", 6000);
        } catch (error) {
            console.log('Failed...', error);
            showError('❌ Failed to send message. Please try again or contact me directly.', 7000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-base-100 text-base-content py-5 px-0 md:px-10 lg:py-10 md:my-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-200 p-6 md:p-12 rounded-[32px] shadow-2xl border border-white/5"
            >
                {/* --- Left Side: Info --- */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col justify-center"
                >
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

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="hidden lg:flex items-center gap-4 text-primary text-6xl opacity-20"
                    >
                        <HiOutlineMailOpen />
                    </motion.div>
                </motion.div>

                {/* --- Right Side: Form --- */}
                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                        >
                            <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Your name</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="text"
                                name="name"
                                required
                                placeholder="John Doe"
                                className="input input-bordered placeholder:text-base-content/50 w-full bg-base-100 focus:border-primary transition-all duration-300 rounded-xl"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-2"
                        >
                            <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Your email</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                className="input input-bordered placeholder:text-base-content/50 w-full bg-base-100 focus:border-primary transition-all duration-300 rounded-xl"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                    >
                        <label className="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Subject</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="title"
                            required
                            placeholder="Project Inquiry"
                            className="input input-bordered w-full placeholder:text-base-content/50 bg-base-100 focus:border-primary transition-all duration-300 rounded-xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2"
                    >
                        <label className="text-xs font-bold uppercase placeholder:text-base-content/50 tracking-wider opacity-60 ml-1">Your message</label>
                        <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            name="message"
                            required
                            placeholder="How can I help you?"
                            className="textarea textarea-bordered placeholder:text-base-content/50 w-full bg-base-100 h-32 focus:border-primary transition-all duration-300 rounded-xl"
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className={`btn btn-primary w-full tracking-[3px] text-white font-bold rounded-xl transition-all duration-500 ${loading ? 'opacity-50' : 'hover:shadow-[0_0_20px_rgba(var(--p),0.4)]'}`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <span className="loading loading-spinner loading-sm"></span>
                                Sending...
                            </div>
                        ) : (
                            "SEND MESSAGE"
                        )}
                    </motion.button>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default Contact;
