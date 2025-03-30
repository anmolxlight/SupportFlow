"use client";

import { useState } from 'react';
import { Search, MoreVertical, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AgentSettings from './AgentSettings';

type Agent = {
  id: string;
  name: string;
  type: string;
  phoneNumber?: string;
};

const agents: Agent[] = [
  {
    id: '1',
    name: 'Support agent',
    type: 'Agent',
    phoneNumber: '+1 272 379 9799',
  },
];

export default function AgentsContent() {
  const [selectedAgentId, setSelectedAgentId] = useState('1'); // Default to the first agent
  const selectedAgent = agents.find(agent => agent.id === selectedAgentId);

  return (
    <div className="flex h-full">
      <div className="w-72 border-r border-neutral-200 h-full overflow-auto">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
            <Input
              placeholder="Search agents by name or ID..."
              className="pl-10"
            />
          </div>

          <div className="space-y-1">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`flex items-center justify-between p-3 hover:bg-neutral-100 rounded-md cursor-pointer ${
                  agent.id === selectedAgentId ? 'bg-neutral-100' : ''
                }`}
                onClick={() => setSelectedAgentId(agent.id)}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center mr-3">
                    <MessageSquare className="h-4 w-4 text-neutral-600" />
                  </div>
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs text-neutral-500">{agent.type}</div>
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
        {selectedAgent && <AgentSettings agent={selectedAgent} />}
      </div>
    </div>
  );
}
