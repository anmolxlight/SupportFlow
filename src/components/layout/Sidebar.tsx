"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  History,
  Book,
  Phone,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agents', href: '/agents', icon: Users },
  { name: 'Call History', href: '/call-history', icon: History },
  { name: 'Knowledge Base', href: '/knowledge-base', icon: Book },
  { name: 'Phone Numbers', href: '/phone-numbers', icon: Phone },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-neutral-100 h-full flex flex-col border-r border-neutral-200">
      <div className="px-4 py-4">
        <div className="flex items-center">
          <h1 className="font-medium text-xl">SupportFlow</h1>
        </div>
        <div className="text-sm font-medium text-neutral-800">Conversational AI</div>
      </div>

      <nav className="flex-1 px-2 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive ? 'bg-neutral-200' : 'hover:bg-neutral-200'
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
  );
}
