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

// CallDetails component with explicitly scrollable transcript
const CallDetails = ({ call }: { call: Call }) => {
  // Format date if it exists, otherwise use placeholder
  const formattedDate = call.date || "Not available";

  // Format duration if it exists, otherwise use placeholder
  const formattedDuration = call.duration || (call.metadata?.call_duration_secs 
    ? `${Math.floor(call.metadata.call_duration_secs / 60)}:${(call.metadata.call_duration_secs % 60).toString().padStart(2, '0')}` 
    : "Not available");

  return (
    <div className="flex flex-col max-h-full">
      <div className="flex-none mb-4">
        <h2 className="text-xl font-semibold">Conversation with</h2>
      </div>
      
      <div className="flex-none grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 mb-4">
        <span className="font-medium">Date:</span>
        <span>{formattedDate}</span>
        
        <span className="font-medium">Duration:</span>
        <span>{formattedDuration}</span>
        
        <span className="font-medium">Cost:</span>
        <span>{call.metadata?.cost || 0} credits</span>
        
        <span className="font-medium">Status:</span>
        <span>
          <span className="px-2 py-1 text-xs bg-gray-200 rounded-md">
            {call.analysis?.call_successful === 'success' ? 'Success' : 'Failed'}
          </span>
        </span>
      </div>
      
      <h3 className="flex-none font-medium mb-2">Transcript:</h3>
      
      {/* Explicitly scrollable transcript container with fixed max-height */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
        {call.transcript.map((entry, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div 
              className={entry.role === "Agent" ? "text-blue-500 font-medium" : "text-green-500 font-medium"}
            >
              {entry.role}:
            </div>
            <div className="text-gray-700">
              {entry.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CallHistoryContent() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [calls, setCalls] = useState<Call[]>([]); // Initialize calls as an empty array

  // Fetching data from the API
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch('http://localhost:9090/yourmodel/getAllDataObjects'); // Replace with your API endpoint
        const data = await response.json();
        
        // Transform the data to ensure it has all required fields
        const processedData = data
          .filter((call: Call | null) => call !== null)
          .map((call: Call) => ({
            ...call,
            // Ensure date exists (use a default if missing)
            date: call.date || new Date().toISOString().split('T')[0],
            // Ensure duration exists (calculate from metadata if available)
            duration: call.duration || (call.metadata?.call_duration_secs 
              ? `${Math.floor(call.metadata.call_duration_secs / 60)}:${(call.metadata.call_duration_secs % 60).toString().padStart(2, '0')}` 
              : "0:00"),
            // Extract call success status
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
    <div className="w-full overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Conversation History</h1>

      <div className="space-y-4">
        {calls.map((call) => (
          call && ( // Ensure call is not null
            <div
              key={call.id} // Use call.id as a unique key
              className="p-4 rounded-md border flex items-center cursor-pointer hover:bg-neutral-50"
              onClick={() => setSelectedCall(call)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{call.id}</span>
                  <span className="text-sm font-medium">{call.transcript.length} messages</span>
                  <span className={`badge ${call.analysis?.call_successful === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {call.analysis?.call_successful === 'success' ? 'Success' : 'Failed'}
                  </span>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      <Dialog open={selectedCall !== null} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="max-w-4xl overflow-hidden">
          {selectedCall && <CallDetails call={selectedCall} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
