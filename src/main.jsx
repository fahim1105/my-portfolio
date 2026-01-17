import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from 'framer-motion'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Routes/Router.jsx';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen.jsx';
import { ToastProvider } from './Context/ToastContext.jsx';

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onLoadingComplete={() => setLoading(false)} />
        ) : (
          <RouterProvider key="app" router={router} />
        )}
      </AnimatePresence>
    </ToastProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)