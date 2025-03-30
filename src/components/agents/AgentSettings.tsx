"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown } from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  type: string;
  phoneNumber?: string;
};

type AgentSettingsProps = {
  agent: Agent;
};

export default function AgentSettings({ agent }: AgentSettingsProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{agent.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">Public</Badge>
            <div className="text-sm text-neutral-500">
              <span className="inline-flex items-center">
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +1 272 379 9799
              </span>
            </div>
          </div>
        </div>
        <div>
          <Button>Test AI agent</Button>
        </div>
      </div>

      <Tabs defaultValue="agent">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="agent">Agent</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="widget">Widget</TabsTrigger>
        </TabsList>

        <TabsContent value="agent" className="mt-6">
          <div className="space-y-8">
            <div className="max-w-2xl">
              <div className="space-y-1 mb-3">
                <Label htmlFor="agent-language">Agent Language</Label>
                <div className="text-sm text-neutral-500">Choose the default language the agent will communicate in.</div>
              </div>

              <div className="flex rounded-md border">
                <div className="flex items-center space-x-2 px-4 py-2 w-full">
                  <div className="w-6 h-4 bg-cover bg-[url('https://same-assets.com/lib/flags/us.svg')]"></div>
                  <span>English</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <div className="space-y-1 mb-3">
                <Label>Additional Languages</Label>
                <div className="text-sm text-neutral-500">Specify additional languages which callers can choose from.</div>
              </div>

              <div className="flex items-center space-x-2 border px-3 py-2 rounded-md">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-4 bg-cover bg-[url('https://same-assets.com/lib/flags/in.svg')]"></div>
                  <span>Hindi</span>
                </div>
                <button className="ml-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="mt-3 text-sm text-neutral-500">
                To support additional languages, language overrides will be enabled. You can view and configure all overrides in the "Security" tab.
              </div>
            </div>

            <div className="max-w-2xl">
              <div className="space-y-1 mb-3">
                <Label htmlFor="first-message">First message</Label>
                <div className="text-sm text-neutral-500">
                  The first message the agent will say. If empty, the agent will wait for the user to start the conversation. You can specify different prompts for each language.
                </div>
              </div>

              <div className="flex items-center mb-3 border rounded-md">
                <div className="flex items-center space-x-2 px-4 py-2">
                  <div className="w-6 h-4 bg-cover bg-[url('https://same-assets.com/lib/flags/us.svg')]"></div>
                  <span className="text-sm">Default (English)</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </div>

                <div className="ml-auto px-3">
                  <Button variant="ghost" size="sm" className="text-xs font-medium">
                    Translate to all
                  </Button>
                </div>
              </div>

              <Textarea
                id="first-message"
                placeholder="Hi, I'm James. Thank you for calling Amazon. How can I help you today?"
                className="min-h-32"
                defaultValue="Hi, I'm James. Thank you for calling Amazon. How can I help you today?"
              />
            </div>

            <div className="max-w-2xl">
              <div className="space-y-1 mb-3">
                <Label htmlFor="system-prompt">System prompt</Label>
                <div className="text-sm text-neutral-500">
                  The system prompt is used to determine the persona of the agent and the context of the conversation.
                </div>
              </div>

              <Textarea
                id="system-prompt"
                className="min-h-32"
                defaultValue="You are a support agent named James. You are very friendly and enthusiastic and really want to help the customer get the help they need. Answer in 3 to 7 sentences in most cases. Say only things which are needed."
              />
            </div>

            <div className="max-w-2xl">
              <div className="space-y-1 mb-3">
                <Label>Dynamic Variables</Label>
                <div className="text-sm text-neutral-500">
                  Variables like {"{{user_name}}"} in your prompts and first message will be replaced with actual values when the conversation starts.
                </div>
              </div>

              <div className="flex">
                <Button variant="outline" size="sm">Learn more</Button>
              </div>
            </div>

            <div className="max-w-2xl">
              <div className="space-y-1 mb-3">
                <Label>LLM</Label>
                <div className="text-sm text-neutral-500">
                  Select which provider and model to use for the LLM.
                </div>
              </div>

              <div className="text-sm mb-2">
                If your chosen LLM is not available at the moment or something goes wrong, we will redirect the conversation to another LLM.
              </div>

              <div className="text-sm mb-4">
                Currently, the LLM cost is covered by us. In the future, <span className="font-medium">this cost will be passed onto you</span>.
              </div>

              <div className="flex rounded-md border">
                <div className="flex items-center justify-between px-4 py-2 w-full">
                  <span>Claude 3.7 Sonnet</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <div className="space-y-1 mb-3">
                <Label>Temperature</Label>
                <div className="text-sm text-neutral-500">
                  Temperature is a parameter that controls the creativity or randomness of the responses generated by the LLM.
                </div>
              </div>

              <div className="h-8 w-full bg-neutral-200 rounded-full relative">
                <div className="h-8 w-1/2 bg-neutral-800 rounded-full"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow"></div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          {/* Security tab content would go here */}
        </TabsContent>

        <TabsContent value="voice" className="mt-6">
          {/* Voice tab content would go here */}
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          {/* Analysis tab content would go here */}
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          {/* Advanced tab content would go here */}
        </TabsContent>

        <TabsContent value="widget" className="mt-6">
          {/* Widget tab content would go here */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
