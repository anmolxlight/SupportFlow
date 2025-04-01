"use client";

import { Badge } from '@/components/ui/badge';

type CallDetailsProps = {
  call: {
    id: string;
    date: string;
    agent: string;
    messageCount: number;
    duration: string;
    status: 'Success' | 'Failed';
    transcript: {
      role: string;
      message: string;
    }[];
    metadata: {
      call_duration_secs: number;
      cost: number;
    };
    // Add any other relevant fields here
  };
};

export default function CallDetails({ call }: CallDetailsProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Conversation with {call.agent}</h2>
      <div className="mt-4">
        <div><strong>Date:</strong> {call.date}</div>
        <div><strong>Duration:</strong> {Math.floor(call.metadata.call_duration_secs / 60)}:{(call.metadata.call_duration_secs % 60).toString().padStart(2, '0')}</div>
        <div><strong>Cost:</strong> {call.metadata.cost} credits</div>
        <div><strong>Status:</strong> <Badge>{call.status}</Badge></div>
      </div>

      <h3 className="mt-6 text-md font-semibold">Transcript:</h3>
      <div className="mt-2">
        {call.transcript.map((entry, index) => (
          <div key={index} className={`mb-2 ${entry.role === 'agent' ? 'text-blue-600' : 'text-green-600'}`}>
            <strong>{entry.role === 'agent' ? 'Agent' : 'User'}:</strong> {entry.message}
          </div>
        ))}
      </div>
    </div>
  );
}
