"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Remove any extension-added classes during hydration
  useEffect(() => {
    setMounted(true);
    
    // This runs only on the client after hydration
    document.body.className = "antialiased min-h-screen touch-pan-y transition-colors duration-300 ease-in-out";
    
    // Prevent zoom on iOS double-tap
    let lastTouchEnd = 0;
    const preventDefault = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };
    
    document.addEventListener('touchend', preventDefault, { passive: false });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.removeEventListener('touchend', preventDefault);
    };
  }, []);

  // Add theme-based background gradient
  const backgroundVariants = {
    light: {
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    dark: {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  if (!mounted) {
    return (
      <body 
        className="antialiased min-h-screen touch-pan-y select-none sm:select-auto" 
        suppressHydrationWarning
      >
        {children}
      </body>
    );
  }

  return (
    <body 
      className="antialiased min-h-screen touch-pan-y select-none sm:select-auto transition-colors duration-300 ease-in-out" 
      suppressHydrationWarning
    >
      <motion.div
        className="min-h-screen relative"
        initial={false}
        animate={resolvedTheme === "dark" ? "dark" : "light"}
        variants={backgroundVariants}
      >
        {/* Background pattern overlay */}
        <div className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Main content with page transitions */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={resolvedTheme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating elements for visual enhancement */}
        <motion.div
          className="fixed top-10 right-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="fixed bottom-10 left-10 w-24 h-24 bg-green-500/10 dark:bg-green-400/10 rounded-full blur-2xl pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>
    </body>
  );
}