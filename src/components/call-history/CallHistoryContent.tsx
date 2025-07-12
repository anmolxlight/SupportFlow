"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type Call = {
  id: string;
  date: string;
  agent: string;
  messageCount: number;
  duration: string;
  analysis?: {
    call_successful?: string;
  };
  transcript: {
    role: string;
    message: string;
  }[];
  metadata: {
    call_duration_secs: number;
    cost: number;
  };
};

// CallDetails component with mobile-responsive design
const CallDetails = ({ call }: { call: Call }) => {
  const formattedDate = call.date || "Not available";
  const formattedDuration = call.duration || (call.metadata?.call_duration_secs 
    ? `${Math.floor(call.metadata.call_duration_secs / 60)}:${(call.metadata.call_duration_secs % 60).toString().padStart(2, '0')}` 
    : "Not available");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Conversation with</h2>
      </div>
      
      {/* Mobile: Card Layout, Desktop: Grid Layout */}
      <div className="flex-none mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-2">
          <div className="flex justify-between sm:block">
            <span className="font-medium">Date:</span>
            <span className="text-neutral-600 sm:text-black">{formattedDate}</span>
          </div>
          
          <div className="flex justify-between sm:block">
            <span className="font-medium">Duration:</span>
            <span className="text-neutral-600 sm:text-black">{formattedDuration}</span>
          </div>
          
          <div className="flex justify-between sm:block">
            <span className="font-medium">Cost:</span>
            <span className="text-neutral-600 sm:text-black">{call.metadata?.cost || 0} credits</span>
          </div>
          
          <div className="flex justify-between sm:block">
            <span className="font-medium">Status:</span>
            <span>
              <span className={`px-2 py-1 text-xs rounded-md ${
                call.analysis?.call_successful === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {call.analysis?.call_successful === 'success' ? 'Success' : 'Failed'}
              </span>
            </span>
          </div>
        </div>
      </div>
      
      <h3 className="flex-none font-medium mb-3">Transcript:</h3>
      
      {/* Mobile-optimized transcript container */}
      <div className="flex-1 overflow-y-auto bg-neutral-50 rounded-lg p-4 sm:p-6">
        <div className="space-y-4">
          {call.transcript.map((entry, index) => (
            <div key={index} className="last:mb-0">
              <div className={`font-medium mb-2 ${
                entry.role === "Agent" ? "text-blue-600" : "text-green-600"
              }`}>
                {entry.role}:
              </div>
              <div className="text-neutral-700 leading-relaxed pl-3 border-l-2 border-neutral-200">
                {entry.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CallHistoryContent() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);

  // Fetching data from the API
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch('http://localhost:9090/yourmodel/getAllDataObjects');
        const data = await response.json();
        
        const processedData = data
          .filter((call: Call | null) => call !== null)
          .map((call: Call) => ({
            ...call,
            date: call.date || new Date().toISOString().split('T')[0],
            duration: call.duration || (call.metadata?.call_duration_secs 
              ? `${Math.floor(call.metadata.call_duration_secs / 60)}:${(call.metadata.call_duration_secs % 60).toString().padStart(2, '0')}` 
              : "0:00"),
            status: call.analysis?.call_successful === 'success' ? 'Success' : 'Failed',
          }));
        
        setCalls(processedData);
      } catch (error) {
        console.error('Error fetching calls:', error);
      }
    };

    fetchCalls();
  }, []);

  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Conversation History</h1>

        {/* Mobile-optimized call list */}
        <div className="space-y-3 sm:space-y-4">
          {calls.map((call) => (
            call && (
              <div
                key={call.id}
                className="p-4 sm:p-6 rounded-lg border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => setSelectedCall(call)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  {/* Mobile: Stacked layout, Desktop: Horizontal */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2 sm:mb-0">
                      <span className="text-sm sm:text-base font-medium">{call.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        call.analysis?.call_successful === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {call.analysis?.call_successful === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    
                    {/* Mobile: Additional details */}
                    <div className="flex items-center justify-between text-sm text-neutral-600 sm:hidden">
                      <span>{call.transcript.length} messages</span>
                      <span>{call.duration || '0:00'}</span>
                    </div>
                  </div>
                  
                  {/* Desktop: Horizontal layout */}
                  <div className="hidden sm:flex items-center gap-6">
                    <span className="text-sm font-medium">{call.transcript.length} messages</span>
                    <span className="text-sm text-neutral-600">{call.duration || '0:00'}</span>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Show empty state if no calls */}
        {calls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No conversation history available.</p>
          </div>
        )}
      </div>

      {/* Mobile-optimized dialog */}
      <Dialog open={selectedCall !== null} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="w-full h-full sm:max-w-4xl sm:h-auto max-h-screen overflow-hidden p-0">
          <div className="h-full p-4 sm:p-6">
            {selectedCall && <CallDetails call={selectedCall} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
