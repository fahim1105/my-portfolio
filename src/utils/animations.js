// Reusable Framer Motion Animation Variants

// Page Transition Animations
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Fade In Animation
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

// Slide In From Left
export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Slide In From Right
export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Slide In From Bottom
export const slideInBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Scale In Animation
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Stagger Container (for lists)
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger Item
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Hover Scale Animation
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

// Hover Lift Animation
export const hoverLift = {
  y: -10,
  transition: { duration: 0.3 },
};

// Rotate Animation
export const rotate = {
  initial: { rotate: 0 },
  animate: { rotate: 360 },
  transition: { duration: 20, repeat: Infinity, ease: "linear" },
};

// Pulse Animation
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Float Animation
export const float = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Card Hover Effect
export const cardHover = {
  scale: 1.02,
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  transition: { duration: 0.3 },
};

// Bounce In Animation
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

// Blur In Animation
export const blurIn = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.6 },
};

// Viewport Animation (for scroll-triggered animations)
export const viewportOptions = {
  once: true,
  amount: 0.3,
};
