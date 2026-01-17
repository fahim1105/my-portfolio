import { createContext, useContext, useState } from 'react';
import Toast from '../Components/Toast/Toast';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (type, message, duration = 5000) => {
        const id = Date.now();
        const newToast = { id, type, message, duration };
        
        setToasts(prev => [...prev, newToast]);
    };

    const hideToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showSuccess = (message, duration) => showToast('success', message, duration);
    const showError = (message, duration) => showToast('error', message, duration);
    const showInfo = (message, duration) => showToast('info', message, duration);

    return (
        <ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo }}>
            {children}
            
            {/* Render Toasts */}
            <div className="fixed top-0 right-0 z-[9999] p-4 space-y-4 pointer-events-none">
                {toasts.map((toast, index) => (
                    <div key={toast.id} className="pointer-events-auto" style={{ zIndex: 9999 - index }}>
                        <Toast
                            type={toast.type}
                            message={toast.message}
                            isVisible={true}
                            onClose={() => hideToast(toast.id)}
                            duration={toast.duration}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};