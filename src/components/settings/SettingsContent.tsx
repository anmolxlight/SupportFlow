"use client";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function SettingsContent() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="max-w-2xl space-y-6">
        <div className="border rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">Account</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" className="mt-1" defaultValue="Alam" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" className="mt-1" defaultValue="alam@example.com" />
            </div>

            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" className="mt-1" defaultValue="My Workspace" />
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-neutral-500">Receive email notifications for important events</div>
              </div>
              <Switch id="email-notifications" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-neutral-500">Receive push notifications in the browser</div>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>
          </div>
        </div>

        <div className="border rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">API Keys</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex mt-1">
                <Input
                  id="api-key"
                  className="rounded-r-none"
                  type="password"
                  defaultValue="elevenlabs-api-key-example-12345678"
                />
                <Button className="rounded-l-none">Show</Button>
              </div>
              <div className="text-sm text-neutral-500 mt-1">
                Use this key to authenticate your API requests.
              </div>
            </div>

            <div className="flex">
              <Button variant="outline">Regenerate API Key</Button>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">Billing</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Current Plan</div>
                <div className="text-sm text-neutral-500">Free Tier</div>
              </div>
              <Button>Upgrade</Button>
            </div>

            <div>
              <div className="font-medium">Credits Used This Month</div>
              <div className="mt-2 h-4 w-full bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '37%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <div>3,832 credits used</div>
                <div>10,000 credits total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
