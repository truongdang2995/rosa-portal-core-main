
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResearchTab } from '@/components/fee/ResearchTab';
import { ConfigTab } from '@/components/fee/ConfigTab';
import { Search, Settings } from 'lucide-react';

const FeeConfiguration = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Fee Configuration</h1>
      </div>
      
      <Tabs defaultValue="research" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="research" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Research
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Config
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="research" className="mt-6">
          <ResearchTab />
        </TabsContent>
        
        <TabsContent value="config" className="mt-6">
          <ConfigTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeeConfiguration;
