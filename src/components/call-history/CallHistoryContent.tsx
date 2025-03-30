"use client";

import { MessageSquare, Clock, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CallDetails from './CallDetails';

type Call = {
  id: string;
  date: string;
  agent: string;
  messageCount: number;
  duration: string;
  status: 'Success' | 'Failed';
};

const calls: Call[] = [
  {
    id: '1',
    date: 'Yesterday, 23:38',
    agent: 'Support agent',
    messageCount: 3,
    duration: '0:18',
    status: 'Success',
  },
  {
    id: '2',
    date: 'Yesterday, 23:33',
    agent: 'Support agent',
    messageCount: 26,
    duration: '2:43',
    status: 'Success',
  },
  {
    id: '3',
    date: 'Yesterday, 10:43',
    agent: 'Support agent',
    messageCount: 17,
    duration: '2:13',
    status: 'Success',
  },
  {
    id: '4',
    date: '18 Mar, 15:44',
    agent: 'Support agent',
    messageCount: 15,
    duration: '1:14',
    status: 'Success',
  },
  {
    id: '5',
    date: '14 Mar, 23:05',
    agent: 'Support agent',
    messageCount: 12,
    duration: '1:15',
    status: 'Success',
  },
  {
    id: '6',
    date: '25 Feb, 10:51',
    agent: 'Support agent',
    messageCount: 19,
    duration: '1:53',
    status: 'Success',
  },
  {
    id: '7',
    date: '17 Feb, 11:35',
    agent: 'Support agent',
    messageCount: 13,
    duration: '1:16',
    status: 'Success',
  },
  {
    id: '8',
    date: '15 Feb, 23:05',
    agent: 'Support agent',
    messageCount: 11,
    duration: '1:05',
    status: 'Success',
  },
  {
    id: '9',
    date: '15 Feb, 13:28',
    agent: 'Support agent',
    messageCount: 17,
    duration: '1:50',
    status: 'Success',
  },
  {
    id: '10',
    date: '14 Feb, 14:41',
    agent: 'Support agent',
    messageCount: 11,
    duration: '1:02',
    status: 'Success',
  },
];

export default function CallHistoryContent() {
  // Simulate the active call detail state
  const selectedCallId = '1'; // For demo purposes, select the first call
  const selectedCall = calls.find(call => call.id === selectedCallId);

  return (
    <div className="flex h-full">
      <div className="w-3/5 border-r border-neutral-200 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Conversation History</h1>

          <div className="flex justify-between mb-4">
            <div className="flex items-center border rounded-md">
              <button className="px-4 py-2 flex items-center text-sm font-medium">
                All results
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>

            <div className="flex items-center border rounded-md">
              <button className="px-4 py-2 flex items-center text-sm font-medium">
                All agents
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {calls.map((call) => (
              <div
                key={call.id}
                className={`p-4 rounded-md border flex items-center cursor-pointer ${
                  call.id === selectedCallId ? 'border-blue-500 bg-blue-50' : 'hover:bg-neutral-50'
                }`}
              >
                <div className="bg-neutral-100 rounded-full p-2 mr-4">
                  <MessageSquare className="h-5 w-5 text-neutral-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{call.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-sm font-medium">{call.agent}</div>

                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-neutral-500" />
                    <span className="text-sm">{call.messageCount}</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-neutral-500" />
                    <span className="text-sm">{call.duration}</span>
                  </div>

                  <Badge variant={call.status === 'Success' ? 'default' : 'destructive'}>
                    {call.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-2/5 overflow-auto">
        {selectedCall && <CallDetails call={selectedCall} />}
      </div>
    </div>
  );
}
