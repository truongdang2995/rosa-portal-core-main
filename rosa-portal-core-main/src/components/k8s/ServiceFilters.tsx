
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceFiltersProps {
  selectedNamespace: string;
  setSelectedNamespace: (namespace: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  namespaces: string[];
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  selectedNamespace,
  setSelectedNamespace,
  searchQuery,
  setSearchQuery,
  namespaces
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="w-full md:w-1/3">
        <Label htmlFor="namespace">Namespace</Label>
        <Select value={selectedNamespace} onValueChange={setSelectedNamespace}>
          <SelectTrigger id="namespace" className="bg-background border-border focus:border-primary">
            <SelectValue placeholder="Select namespace" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Namespaces</SelectItem>
            {namespaces.map(ns => (
              <SelectItem key={ns} value={ns}>{ns}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-2/3">
        <Label htmlFor="search">Search Services</Label>
        <Input
          id="search"
          placeholder="Tìm kiếm services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-background border-border focus:border-primary"
        />
      </div>
    </div>
  );
};

export default ServiceFilters;
