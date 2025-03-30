"use client";

import { Phone, MoreVertical, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PhoneNumberDetail from './PhoneNumberDetail';
import PhoneNumberSetupForm from './PhoneNumberSetupForm';
import NoPhoneNumberSelected from './NoPhoneNumberSelected';

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
  // Simulating whether a phone number is selected or we're in setup mode
  const selectedPhoneNumber = phoneNumbers[0]; // Selecting the first phone number by default
  const isSetupMode = false; // For the phone number setup form
  const noPhoneNumberSelected = false; // For the "No phone number selected" state

  return (
    <div className="flex h-full">
      <div className="w-72 border-r border-neutral-200 h-full overflow-auto">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start mb-4">
            <PhoneCall className="h-4 w-4 mr-2" />
            Active calls: 0
          </Button>
        </div>

        <div className="px-4 py-2">
          <div className="mb-4">
            <div className="relative">
              <Input placeholder="Search phone numbers..." className="pl-10" />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-neutral-500" />
              </div>
            </div>
          </div>

          <div>
            {phoneNumbers.map((phoneNumber) => (
              <div
                key={phoneNumber.id}
                className="flex items-center justify-between p-3 hover:bg-neutral-100 rounded-md cursor-pointer"
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

      <div className="flex-1 h-full overflow-auto">
        {selectedPhoneNumber && !isSetupMode && !noPhoneNumberSelected && (
          <PhoneNumberDetail phoneNumber={selectedPhoneNumber} />
        )}

        {isSetupMode && (
          <PhoneNumberSetupForm />
        )}

        {noPhoneNumberSelected && (
          <NoPhoneNumberSelected />
        )}
      </div>
    </div>
  );
}
