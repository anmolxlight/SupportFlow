"use client";

import { Globe, FileText, Text, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type Document = {
  id: string;
  name: string;
  size: string;
  createdBy: string;
  updatedAt: string;
};

const documents: Document[] = [
  {
    id: '1',
    name: 'Untitled document',
    size: '5.7 kB',
    createdBy: 'Alam',
    updatedAt: 'yesterday, 23:22',
  },
  {
    id: '2',
    name: 'Amazon_knowledge_base_d13a0f.txt',
    size: '3.7 kB',
    createdBy: 'Alam',
    updatedAt: '14 Feb, 13:15',
  },
];

export default function KnowledgeBaseContent() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Knowledge Base</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="h-10 w-10 rounded-md bg-neutral-100 flex items-center justify-center">
              <Globe className="h-6 w-6" />
            </div>
            <div className="font-medium">Add URL</div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="h-10 w-10 rounded-md bg-neutral-100 flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <div className="font-medium">Add Files</div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="h-10 w-10 rounded-md bg-neutral-100 flex items-center justify-center">
              <Text className="h-6 w-6" />
            </div>
            <div className="font-medium">Create Text</div>
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
          <Input
            placeholder="Search Knowledge Base..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 p-4 border-b text-sm font-medium text-neutral-500">
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Created by</div>
          <div className="col-span-4">Last updated</div>
          <div className="col-span-1"></div>
        </div>

        {documents.map((doc) => (
          <div key={doc.id} className="grid grid-cols-12 p-4 border-b hover:bg-neutral-50 transition-colors">
            <div className="col-span-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-neutral-500" />
              <div>
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-neutral-500">{doc.size}</div>
              </div>
            </div>
            <div className="col-span-3 flex items-center">{doc.createdBy}</div>
            <div className="col-span-4 flex items-center">{doc.updatedAt}</div>
            <div className="col-span-1 flex items-center justify-end">
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
