import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  Globe,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrentMenuTitle } from './AppSidebar';

interface AppNavbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  isMobile?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export function AppNavbar({ isCollapsed, onToggleSidebar, isMobile = false, searchQuery, onSearchChange, className }: AppNavbarProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const currentMenuTitle = useCurrentMenuTitle();
  const customerName = "Toyota Mortor Asia (TMA)"; // This would come from your auth/state management

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in real-time via onSearchChange
  };

  return (
    <motion.header
      className={cn(
        "flex items-center justify-between h-16 px-4 bg-navbar border-b border-navbar-border",
        "sticky top-0 z-40 backdrop-blur-sm bg-navbar/95",
        className
      )}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="text-navbar-foreground hover:bg-muted/50"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            {isMobile ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </Button>

        {/* Current Menu & Customer Name */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden sm:flex flex-col min-w-0">
            <h1 className="text-sm font-semibold text-navbar-foreground truncate">
              {currentMenuTitle}
            </h1>
            <p className="text-xs text-navbar-foreground/60 truncate">
              {customerName}
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-sm font-semibold text-navbar-foreground truncate">
              {currentMenuTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search menus, features..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-colors"
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-navbar-foreground">
                <Search className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <form onSubmit={handleSearch} className="relative p-4">
                <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search menus, features..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </form>
            </PopoverContent>
          </Popover>
        </div>

        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-navbar-foreground gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">{selectedLanguage.flag}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => setSelectedLanguage(language)}
                className={cn(
                  "flex items-center gap-3",
                  selectedLanguage.code === language.code && "bg-accent"
                )}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="text-navbar-foreground relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-navbar-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/api/placeholder/32/32" alt="User" />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm">John Doe</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}