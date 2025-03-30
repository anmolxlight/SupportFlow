"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  RotateCcw,
  RotateCw,
  Download,
  X
} from 'lucide-react';

type Call = {
  id: string;
  date: string;
  agent: string;
  messageCount: number;
  duration: string;
  status: 'Success' | 'Failed';
};

type CallDetailsProps = {
  call: Call;
};

export default function CallDetails({ call }: CallDetailsProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex justify-between items-center border-b">
        <div>
          <h2 className="text-lg font-semibold">Conversation with {call.agent}</h2>
          <div className="text-neutral-500 text-sm">HQ5MF3r34mOf8XCp0HnE</div>
        </div>
        <div className="flex items-center">
          <X className="h-5 w-5 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 overflow-auto flex flex-col">
        <div className="p-4 border-b">
          <div className="relative h-20 bg-neutral-100 rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Audio waveform representation */}
              <div className="w-full px-6 flex items-center justify-center space-x-0.5">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 w-0.5 bg-neutral-300"
                    style={{
                      height: `${Math.sin(i * 0.4) * 50 + 30}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <button className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </button>
                <button className="text-neutral-500">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button className="text-neutral-500">
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-neutral-500">0:00 / 0:17</div>
                <button className="text-neutral-500">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start px-4 h-12 border-b">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transcription">Transcription</TabsTrigger>
              <TabsTrigger value="client-data">Client data</TabsTrigger>
              <TabsTrigger value="phone-call">Phone call</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Summary</h3>
                  <p className="text-neutral-700">
                    The user inquired if the agent could speak Sindhi. The agent apologized, stating they do not speak Sindhi and asked if the user would like to speak in English instead.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Call status</h3>
                  <Badge>Success</Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcription" className="p-6 space-y-4">
              <div className="p-4 rounded-lg bg-neutral-100 relative">
                <div className="mb-2 text-xs text-neutral-500">0:00</div>
                <p className="font-medium">
                  Hi, I'm James. Thank you for calling Amazon. How can I help you today?
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 relative">
                <div className="mb-2 text-xs text-neutral-500">0:04</div>
                <p className="font-medium">
                  क्या तुम मुझे सिंधी में बात कर सकते?
                </p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-100 relative">
                <div className="mb-2 text-xs text-neutral-500">0:09</div>
                <p className="font-medium">
                  मुझे माफ करना, मै सिंधी नहीं बोल सकता. क्या आप अंग्रेजी में बात करना चाहेंगे?
                </p>
                <div className="mt-2 flex gap-3 text-xs text-neutral-500">
                  <div>LLM 357 ms</div>
                  <div>RAG 354 ms</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="client-data" className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium mb-3">Dynamic Variables</h3>

                <div className="grid grid-cols-2 gap-y-4">
                  <div className="text-neutral-700">system_conversation_id</div>
                  <div>HQ5MF3r34mOf8XCp0HnE</div>

                  <div className="text-neutral-700">system_call_duration_secs</div>
                  <div>18</div>

                  <div className="text-neutral-700">system_agent_id</div>
                  <div>iHxgOQJEAn7ZJurTcZ1y</div>

                  <div className="text-neutral-700">system_caller_id</div>
                  <div>+917906632174</div>

                  <div className="text-neutral-700">system_time_utc</div>
                  <div>2025-03-24T18:08:53.419519+00:00</div>

                  <div className="text-neutral-700">system_called_number</div>
                  <div>+12723799799</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="phone-call" className="p-6">
              <div className="space-y-6">
                <h3 className="font-medium mb-3">Call Data</h3>

                <div className="grid grid-cols-2 gap-y-4">
                  <div className="text-neutral-700">Direction</div>
                  <div className="flex items-center">
                    <Badge variant="outline">Inbound</Badge>
                  </div>

                  <div className="text-neutral-700">Caller Number</div>
                  <div>+91 79066 32174</div>

                  <div className="text-neutral-700">Receiver Number (Ryan)</div>
                  <div>+1 272 379 9799</div>
                </div>

                <h3 className="font-medium mb-3">Twilio Data</h3>

                <div className="grid grid-cols-2 gap-y-4">
                  <div className="text-neutral-700">Call SID</div>
                  <div className="font-mono text-sm">CA1c83456d29710bef45834a00a0f60eb5</div>

                  <div className="text-neutral-700">Stream SID</div>
                  <div className="font-mono text-sm">MZ442257f5d06e15833bed81f88cbd44bc</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium">Date</div>
            <div>Yesterday, 23:38</div>
          </div>

          <div>
            <div className="text-sm font-medium">Connection duration</div>
            <div>0:18</div>
          </div>

          <div>
            <div className="text-sm font-medium">Cost (credits)</div>
            <div>122</div>
          </div>
        </div>
      </div>
    </div>
  );
}
