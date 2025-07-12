"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased min-h-screen touch-pan-y";
    
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
    
    return () => {
      document.removeEventListener('touchend', preventDefault);
    };
  }, []);

  return (
    <body 
      className="antialiased min-h-screen touch-pan-y select-none sm:select-auto" 
      suppressHydrationWarning
    >
      {children}
    </body>
  );
}