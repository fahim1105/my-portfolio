import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi';
import { useEffect } from 'react';

const Toast = ({ type, message, isVisible, onClose, duration = 5000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, duration]);

    const getToastConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <HiCheckCircle size={24} />,
                    bgColor: 'bg-success',
                    textColor: 'text-success-content',
                    borderColor: 'border-success/20',
                    shadowColor: 'shadow-success/20'
                };
            case 'error':
                return {
                    icon: <HiXCircle size={24} />,
                    bgColor: 'bg-error',
                    textColor: 'text-error-content',
                    borderColor: 'border-error/20',
                    shadowColor: 'shadow-error/20'
                };
            case 'info':
                return {
                    icon: <HiInformationCircle size={24} />,
                    bgColor: 'bg-info',
                    textColor: 'text-info-content',
                    borderColor: 'border-info/20',
                    shadowColor: 'shadow-info/20'
                };
            default:
                return {
                    icon: <HiInformationCircle size={24} />,
                    bgColor: 'bg-base-300',
                    textColor: 'text-base-content',
                    borderColor: 'border-base-300/20',
                    shadowColor: 'shadow-base-300/20'
                };
        }
    };

    const config = getToastConfig();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30 
                    }}
                    className="fixed top-8 right-8 z-[9999] max-w-sm w-full"
                >
                    <div className={`${config.bgColor} ${config.textColor} p-4 rounded-2xl shadow-2xl ${config.shadowColor} border ${config.borderColor} backdrop-blur-sm`}>
                        <div className="flex items-start gap-3">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="flex-shrink-0 mt-0.5"
                            >
                                {config.icon}
                            </motion.div>

                            {/* Message */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                            >
                                <HiXCircle size={20} />
                            </motion.button>
                        </div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: duration / 1000, ease: "linear" }}
                            className="h-1 bg-white/30 rounded-full mt-3"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;