"use client";

import { Globe, FileText, Text, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

type Document = {
  id: string;
  name: string;
  size: string;
  createdBy: string;
  updatedAt: string;
};

const formatFileSize = (bytes: number) => (bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} kB`);

const formatTimestamp = (unixSeconds: number) => {
  const date = new Date(unixSeconds * 1000);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: true };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default function KnowledgeBaseContent() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocContent, setSelectedDocContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('https://api.elevenlabs.io/v1/convai/knowledge-base', {
          method: 'GET',
          headers: {
            'xi-api-key': 'sk_259930e83ede8e2d55ea1533b1a0dcce026ec30436081ba6',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

        const data = await response.json();
        setDocuments(data.documents.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          size: formatFileSize(doc.metadata.size_bytes),
          createdBy: doc.access_info.creator_name,
          updatedAt: formatTimestamp(doc.metadata.last_updated_at_unix_secs),
        })));
      } catch (err) {
        setError('Failed to load knowledge base data.');
        console.error(err);
      }
    };

    fetchDocuments();
  }, []);

  const handleDocumentClick = async (docId: string) => {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/convai/knowledge-base/${docId}`, {
        method: 'GET',
        headers: {
          'xi-api-key': 'sk_259930e83ede8e2d55ea1533b1a0dcce026ec30436081ba6',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch document content.');

      const docData = await response.json();
      setSelectedDocContent(docData.extracted_inner_html);
    } catch (err) {
      setSelectedDocContent(null);
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Knowledge Base</h1>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
          <Input placeholder="Search Knowledge Base..." className="pl-10" />
        </div>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 p-4 border-b text-sm font-medium text-neutral-500">
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Created by</div>
          <div className="col-span-4">Last updated</div>
          <div className="col-span-1"></div>
        </div>

        {documents.length === 0 ? (
          <div className="p-4 text-center text-neutral-500">Loading...</div>
        ) : (
          documents.map((doc) => (
            <div 
              key={doc.id} 
              className="grid grid-cols-12 p-4 border-b hover:bg-neutral-50 transition-colors cursor-pointer" 
              onClick={() => handleDocumentClick(doc.id)}
            >
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
          ))
        )}
      </div>

      {selectedDocContent && (
        <div className="mt-8 p-6 border rounded-md bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Document Content</h2>
          <div dangerouslySetInnerHTML={{ __html: selectedDocContent }} />
        </div>
      )}
    </div>
  );
}
