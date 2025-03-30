"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

type PhoneNumber = {
  id: string;
  number: string;
  agent: string;
  agentType: string;
};

type PhoneNumberDetailProps = {
  phoneNumber: PhoneNumber;
};

export default function PhoneNumberDetail({ phoneNumber }: PhoneNumberDetailProps) {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{phoneNumber.number}</h2>
          <div className="text-sm text-neutral-500">
            {phoneNumber.agent} → {phoneNumber.agentType}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              placeholder="Easy to identify name of the phone number"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone number</Label>
            <div className="mt-2 flex">
              <div className="relative w-20 mr-2">
                <div className="flex items-center justify-between border rounded-md px-3 py-2 cursor-pointer">
                  <span className="flex items-center">
                    <div className="w-6 h-4 mr-1 bg-cover bg-[url('https://same-assets.com/lib/flags/us.svg')]"></div>
                    <span>+1</span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <Input id="phoneNumber" className="flex-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="twilioAccountSid">Twilio Account SID</Label>
            <Input
              id="twilioAccountSid"
              placeholder="Twilio Account SID"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Map to agent</Label>
            <div className="mt-2 text-sm text-neutral-500">
              Select an existing agent or...
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Import</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
