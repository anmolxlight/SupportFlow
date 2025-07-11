"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown } from 'lucide-react';
import { MessageSquare } from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  phoneNumber?: string;
  type: string;
};

interface AgentSettingsProps {
  agent: Agent;
}

export default function AgentSettings({ agent }: AgentSettingsProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Agents</h2>
        <div>
          <Button>Create new agent</Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-md border flex items-center hover:bg-neutral-50">
          <div className="bg-neutral-100 rounded-full p-2 mr-4">
            <MessageSquare className="h-5 w-5 text-neutral-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{agent.name}</span>
              <Badge variant="outline" className="text-xs">Public</Badge>
            </div>
            <div className="text-sm text-neutral-500 mt-1">
              {agent.phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
