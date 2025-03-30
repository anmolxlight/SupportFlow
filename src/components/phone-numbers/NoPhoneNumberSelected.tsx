"use client";

import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NoPhoneNumberSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="bg-neutral-100 rounded-full p-4 mb-4">
        <Phone className="h-8 w-8 text-neutral-600" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No phone number selected</h2>
      <p className="text-neutral-500 mb-6">
        Select an existing phone number or import a new one.
      </p>
      <Button>Import a phone number</Button>
    </div>
  );
}
