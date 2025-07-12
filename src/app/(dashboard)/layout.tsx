import { ReactNode } from 'react';
import MobileNavigation from '@/components/layout/MobileNavigation';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Desktop Layout */}
      <div className="flex h-full">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
