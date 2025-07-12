"use client";

import { useState } from 'react';
import { Search, MoreVertical, MessageSquare, Phone, ArrowLeft } from 'lucide-react';
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
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const selectedAgent = agents.find(agent => agent.id === selectedAgentId);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentId(agentId);
    setShowMobileDetails(true);
  };

  const handleMobileBack = () => {
    setShowMobileDetails(false);
  };

  return (
    <div className="flex h-full">
      {/* Mobile Layout */}
      <div className="md:hidden w-full h-full">
        {!showMobileDetails ? (
          // Mobile: Agent List
          <div className="p-4 h-full overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Agents</h1>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
              <Input
                placeholder="Search agents by name or ID..."
                className="pl-10"
              />
            </div>

            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-4 hover:bg-neutral-50 rounded-lg cursor-pointer border border-neutral-200"
                  onClick={() => handleAgentSelect(agent.id)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center mr-4">
                      <MessageSquare className="h-5 w-5 text-neutral-600" />
                    </div>
                    <div>
                      <div className="font-medium text-base">{agent.name}</div>
                      <div className="text-sm text-neutral-500">{agent.type}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Mobile: Agent Details
          <div className="h-full flex flex-col">
            <div className="flex items-center p-4 border-b border-neutral-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMobileBack}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">Agent Details</h2>
            </div>
            <div className="flex-1 overflow-auto">
              {selectedAgent && <AgentSettings agent={selectedAgent} />}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-full">
        {/* Desktop: Agent List Sidebar */}
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

        {/* Desktop: Agent Details */}
        <div className="flex-1 h-full overflow-auto">
          {selectedAgent && <AgentSettings agent={selectedAgent} />}
        </div>
      </div>
    </div>
  );
}
