import React from 'react';
import { Navigation } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Navigation className="w-8 h-8 text-blue-600" />
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-blue-600">Ride</span>
        <span className="text-gray-900">Connect</span>
      </div>
    </div>
  );
}