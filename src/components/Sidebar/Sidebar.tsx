import React from 'react';
import { Home, Calendar, CheckSquare, LogOut } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { Logo } from '../Logo';
import { User } from '../../types/auth';

interface SidebarProps {
  activeView: 'dashboard' | 'tasks' | 'calendar';
  onViewChange: (view: 'dashboard' | 'tasks' | 'calendar') => void;
  onLogout: () => void;
  user: User;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', value: 'dashboard' as const },
  { icon: CheckSquare, label: 'Tasks', value: 'tasks' as const },
  { icon: Calendar, label: 'Calendar', value: 'calendar' as const },
];

export function Sidebar({ activeView, onViewChange, onLogout, user }: SidebarProps) {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8">
        <Logo />
      </div>
      
      <div className="mb-6 px-4 flex items-center gap-3">
        {user.photoURL ? (
          <img 
            src={user.photoURL} 
            alt={user.displayName || user.email}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {(user.displayName || user.email).charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          {user.displayName && (
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.displayName}
            </p>
          )}
          <p className="text-sm text-gray-500 truncate">
            {user.email}
          </p>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.value}
            icon={item.icon}
            label={item.label}
            active={activeView === item.value}
            onClick={() => onViewChange(item.value)}
          />
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors w-full"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}