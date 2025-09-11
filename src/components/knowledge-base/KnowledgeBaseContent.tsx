"use client";

import { Globe, FileText, Text, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Document = {
  id: string;
  name: string;
  size: string;
  createdBy: string;
  updatedAt: string;
};

type ApiDocument = {
  id: string;
  name: string;
  metadata: {
    size_bytes: number;
    last_updated_at_unix_secs: number;
  };
  access_info: {
    creator_name: string;
  };
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
  const [searchTerm, setSearchTerm] = useState('');

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
        setDocuments(data.documents.map((doc: ApiDocument) => ({
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

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Knowledge Base</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
            <Input 
              placeholder="Search Knowledge Base..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border rounded-lg shadow-sm dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
        >
          {/* Desktop Table Header */}
          <div className="hidden sm:grid grid-cols-12 p-4 border-b text-sm font-medium text-neutral-500 dark:text-neutral-400 dark:border-gray-700 bg-neutral-50 dark:bg-gray-700/50">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Created by</div>
            <div className="col-span-4">Last updated</div>
            <div className="col-span-1"></div>
          </div>

          {error ? (
            <div className="p-6 text-center text-red-500 dark:text-red-400">{error}</div>
          ) : filteredDocuments.length === 0 && documents.length === 0 ? (
            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"
              />
              Loading...
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
              No documents found matching your search.
            </div>
          ) : (
            <div className="divide-y dark:divide-gray-700">
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {/* Desktop Row */}
                  <div 
                    className="hidden sm:grid grid-cols-12 p-4 hover:bg-neutral-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group" 
                    onClick={() => handleDocumentClick(doc.id)}
                  >
                    <div className="col-span-4 flex items-center min-w-0">
                      <FileText className="h-5 w-5 mr-3 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.name}</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">{doc.size}</div>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center text-sm truncate">{doc.createdBy}</div>
                    <div className="col-span-4 flex items-center text-sm">{doc.updatedAt}</div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div 
                    className="sm:hidden p-4 hover:bg-neutral-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => handleDocumentClick(doc.id)}
                  >
                    <div className="space-y-3">
                      {/* Header with icon, name and action button */}
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-neutral-500 dark:text-neutral-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-base leading-tight break-words">{doc.name}</div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{doc.size}</div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Metadata */}
                      <div className="pl-8 space-y-2 text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="text-neutral-500 dark:text-neutral-400 text-xs">Created by:</span>
                          <span className="font-medium break-words">{doc.createdBy}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="text-neutral-500 dark:text-neutral-400 text-xs">Last updated:</span>
                          <span className="font-medium">{doc.updatedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {selectedDocContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 sm:mt-8 p-4 sm:p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">Document Content</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedDocContent(null)}
                className="flex-shrink-0"
              >
                Close
              </Button>
            </div>
            <div 
              className="prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-headings:mt-6 prose-headings:mb-4 prose-p:mb-4 prose-p:leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: selectedDocContent }} 
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
