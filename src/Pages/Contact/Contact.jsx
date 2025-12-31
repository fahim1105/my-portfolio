import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                setStatus("SUCCESS");
                e.target.reset();
            }, (error) => {
                console.log("Failed...", error); // এরর ডিটেইলস দেখার জন্য
                setStatus("ERROR");
            });
    };

    return (
        <section className="bg-base-100 text-base-content p-3 md:p-12 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
                    <span className="text-primary italic">C</span>ontact
                </h2>

                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
                    Get in touch
                </h3>

                <form ref={form} onSubmit={sendEmail} className="space-y-5 bg-base-200 p-5 rounded-xl shadow-lg border border-base-300">

                    {/* Name: Template {{name}} এর সাথে মিল রাখা হয়েছে */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-70">Your name</label>
                        <input type="text" name="name" required className="input input-bordered w-full bg-base-100" />
                    </div>

                    {/* Email: Template {{email}} এর সাথে মিল রাখা হয়েছে */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-70">Your email</label>
                        <input type="email" name="email" required className="input input-bordered w-full bg-base-100" />
                    </div>

                    {/* Subject: আপনার Template এ {{title}} আছে, তাই name="title" দিতে হবে */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-70">Subject</label>
                        <input type="text" name="title" required className="input input-bordered w-full bg-base-100" />
                    </div>

                    {/* Message: Template {{message}} এর সাথে মিল রাখা হয়েছে */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-70">Your message</label>
                        <textarea name="message" required className="textarea textarea-bordered w-full bg-base-100 h-32"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full tracking-widest text-white">SUBMIT</button>

                    {status === "SUCCESS" && <p className="text-success text-center mt-2 font-bold">Message sent successfully!</p>}
                    {status === "ERROR" && <p className="text-error text-center mt-2 font-bold">Error sending message. Please re-connect Gmail in EmailJS.</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;