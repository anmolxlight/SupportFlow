"use client";

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function DashboardContent() {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        <div className="mb-4 sm:mb-0">
          <div className="text-sm text-neutral-500">My Workspace</div>
          <h1 className="text-2xl sm:text-3xl font-bold">call like never before</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="border rounded-md flex items-center">
            <button className="px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start">
              All agents
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>

          <div className="border rounded-md flex items-center">
            <button className="px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start">
              Last month
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <div className="border rounded-md p-4 sm:p-5">
          <Button variant="outline" size="sm" className="mb-3 w-full sm:w-auto">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <span className="text-xs sm:text-sm">Number of calls</span>
          </Button>
          <div className="text-4xl sm:text-5xl font-semibold">6</div>
        </div>

        <div className="border rounded-md p-4 sm:p-5">
          <div className="text-sm font-medium text-neutral-500 mb-3">Average duration</div>
          <div className="text-4xl sm:text-5xl font-semibold">1:36</div>
        </div>

        <div className="border rounded-md p-4 sm:p-5">
          <div className="text-sm font-medium text-neutral-500 mb-3">Total cost</div>
          <div className="text-4xl sm:text-5xl font-semibold">3,832<span className="text-lg font-normal ml-1">credits</span></div>
        </div>

        <div className="border rounded-md p-4 sm:p-5">
          <div className="text-sm font-medium text-neutral-500 mb-3">Average cost</div>
          <div className="text-4xl sm:text-5xl font-semibold">639<span className="text-lg font-normal ml-1">credits/call</span></div>
        </div>
      </div>

      {/* Chart Section - Mobile Responsive */}
      <div className="border rounded-md p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="h-48 sm:h-60 relative overflow-x-auto">
          {/* Chart representation */}
          <div className="absolute inset-0 min-w-[600px] sm:min-w-full">
            <svg viewBox="0 0 600 240" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* X-axis */}
              <line x1="0" y1="220" x2="600" y2="220" stroke="#e5e5e5" />

              {/* Y-axis grid lines */}
              <line x1="0" y1="30" x2="600" y2="30" stroke="#f3f3f3" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#f3f3f3" />
              <line x1="0" y1="130" x2="600" y2="130" stroke="#f3f3f3" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#f3f3f3" />

              {/* X-axis labels */}
              <text x="25" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Feb 22</text>
              <text x="75" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Feb 24</text>
              <text x="125" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Feb 26</text>
              <text x="175" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Feb 28</text>
              <text x="225" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 02</text>
              <text x="275" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 04</text>
              <text x="325" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 06</text>
              <text x="375" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 08</text>
              <text x="425" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 10</text>
              <text x="475" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 12</text>
              <text x="525" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 14</text>
              <text x="575" y="240" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">Mar 16</text>

              {/* Y-axis labels */}
              <text x="0" y="30" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">3</text>
              <text x="0" y="80" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">2.25</text>
              <text x="0" y="130" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">1.5</text>
              <text x="0" y="180" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">0.75</text>
              <text x="0" y="230" fontSize="10" fill="#666" className="text-[10px] sm:text-xs">0</text>

              {/* Chart line */}
              <path
                d="M25,220 L75,220 L125,170 L175,220 L225,220 L275,220 L325,220 L375,220 L425,220 L475,170 L525,170 L575,30"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />

              {/* Data points */}
              <circle cx="25" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="75" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="125" cy="170" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="175" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="225" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="275" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="325" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="375" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="425" cy="220" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="475" cy="170" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="525" cy="170" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
              <circle cx="575" cy="30" r="3" fill="white" stroke="black" strokeWidth="2" className="sm:r-4" />
            </svg>
          </div>
        </div>
      </div>

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
