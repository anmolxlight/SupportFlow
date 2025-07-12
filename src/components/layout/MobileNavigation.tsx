"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  History,
  Book,
  Phone,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agents', href: '/agents', icon: Users },
  { name: 'Call History', href: '/call-history', icon: History },
  { name: 'Knowledge Base', href: '/knowledge-base', icon: Book },
  { name: 'Phone Numbers', href: '/phone-numbers', icon: Phone },
];

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-neutral-200">
        <div className="flex items-center">
          <h1 className="font-medium text-xl">SupportFlow</h1>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-neutral-100"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <div>
                <h1 className="font-medium text-xl">SupportFlow</h1>
                <div className="text-sm font-medium text-neutral-800">Conversational AI</div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md hover:bg-neutral-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center px-3 py-3 rounded-md text-sm ${
                          isActive 
                            ? 'bg-neutral-100 text-neutral-900' 
                            : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}