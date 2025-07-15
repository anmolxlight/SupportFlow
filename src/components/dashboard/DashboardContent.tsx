"use client";

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LoginButton } from '@/components/auth/LoginButton';
import DynamicChart from './DynamicChart';

export default function DashboardContent() {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8"
      >
        <div className="mb-4 sm:mb-0">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">My Workspace</div>
          <h1 className="text-2xl sm:text-3xl font-bold">call like never before</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex gap-2">
            <ThemeToggle />
            <LoginButton />
          </div>
          
          <div className="border rounded-md flex items-center dark:border-gray-700">
            <button className="px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              All agents
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>

          <div className="border rounded-md flex items-center dark:border-gray-700">
            <button className="px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Last month
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid - Responsive */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="border rounded-md p-4 sm:p-5 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
        >
          <Button variant="outline" size="sm" className="mb-3 w-full sm:w-auto">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <span className="text-xs sm:text-sm">Number of calls</span>
          </Button>
          <div className="text-4xl sm:text-5xl font-semibold">6</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="border rounded-md p-4 sm:p-5 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
        >
          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">Average duration</div>
          <div className="text-4xl sm:text-5xl font-semibold">1:36</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="border rounded-md p-4 sm:p-5 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
        >
          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">Total cost</div>
          <div className="text-4xl sm:text-5xl font-semibold">3,832<span className="text-lg font-normal ml-1">credits</span></div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="border rounded-md p-4 sm:p-5 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
        >
          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">Average cost</div>
          <div className="text-4xl sm:text-5xl font-semibold">639<span className="text-lg font-normal ml-1">credits/call</span></div>
        </motion.div>
      </motion.div>

      {/* Chart Section - Mobile Responsive */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border rounded-md p-4 sm:p-6 mb-6 sm:mb-8 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
      >
        <DynamicChart />
      </motion.div>

      {/* Bottom Section - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Called Agents */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-4">Most called agents</h2>
          <div className="border rounded-md overflow-hidden">
            {/* Desktop Table Header */}
            <div className="hidden sm:grid grid-cols-12 p-4 border-b bg-neutral-50">
              <div className="col-span-4 font-medium text-sm">Agent name</div>
              <div className="col-span-3 font-medium text-sm">Number of calls</div>
              <div className="col-span-2 font-medium text-sm">Call minutes</div>
              <div className="col-span-3 font-medium text-sm">Credits spent</div>
            </div>

            {/* Desktop Table Row */}
            <div className="hidden sm:grid grid-cols-12 p-4 border-b">
              <div className="col-span-4">Support agent</div>
              <div className="col-span-3">6</div>
              <div className="col-span-2">10</div>
              <div className="col-span-3">3,832</div>
            </div>

            {/* Mobile Card Layout */}
            <div className="sm:hidden">
              <div className="p-4 border-b">
                <div className="font-medium text-base mb-3">Support agent</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-neutral-500">Number of calls</div>
                    <div className="font-medium">6</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Call minutes</div>
                    <div className="font-medium">10</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-neutral-500">Credits spent</div>
                    <div className="font-medium">3,832</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-4">Language</h2>
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">English</div>
              <div>100.0%</div>
            </div>
            <div className="h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
