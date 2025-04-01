"use client";

import { Phone, MoreVertical, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PhoneNumber = {
  id: string;
  number: string;
  agent: string;
  agentType: string;
};

const phoneNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '+1 272 379 9799',
    agent: 'Ryan',
    agentType: 'Support agent',
  },
];

export default function PhoneNumbersContent() {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start mb-4">
          <PhoneCall className="h-4 w-4 mr-2" />
          Active calls: 0
        </Button>

        <div className="mb-4">
          <div className="relative">
            <Input placeholder="Search phone numbers..." className="pl-10" />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-neutral-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {phoneNumbers.map((phoneNumber) => (
            <div
              key={phoneNumber.id}
              className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-md"
            >
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-neutral-500" />
                <div>
                  <div className="font-medium">{phoneNumber.number}</div>
                  <div className="text-xs text-neutral-500">{phoneNumber.agent} → {phoneNumber.agentType}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
