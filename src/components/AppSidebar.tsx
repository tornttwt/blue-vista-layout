import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Home,
  Settings,
  Users,
  BarChart3,
  FileText,
  Calendar,
  Mail,
  HelpCircle,
  Package,
  CreditCard,
  Shield,
  Database,
  Zap,
  Globe,
  Layers,
  Monitor,
  Building2,
  UserCheck,
  Truck,
  TrendingUp,
  Menu,
  Clock,
  MapPin,
  CalendarPlus,
  CheckCircle,
  Timer,
  Grid,
  Building,
  User,
  Car,
  Route,
  Bot,
  MessageSquare,
  CarIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'DASHBOARD',
    icon: Home,
    href: '/',
  },
  {
    id: 'mainmenu',
    title: 'MAIN MENU',
    icon: Menu,
    children: [
      { id: 'tracking-history', title: 'Tracking history', icon: Clock, href: '/mainmenu/tracking-history' },
      { id: 'tracking-manual', title: 'Tracking manual', icon: MapPin, href: '/mainmenu/tracking-manual' },
      { id: 'calendar', title: 'Calendar', icon: Calendar, href: '/mainmenu/calendar' },
      { id: 'reserve', title: 'Reserve', icon: CalendarPlus, href: '/mainmenu/reserve' },
      { id: 'approved-reserve', title: 'Approved reserve', icon: CheckCircle, href: '/mainmenu/approved-reserve' },
      { id: 'reserve-setting', title: 'Reserve setting', icon: Settings, href: '/mainmenu/reserve-setting' },
      { id: 'shift', title: 'Shift', icon: Clock, href: '/mainmenu/shift' },
      { id: 'adjust-time', title: 'Adjust time', icon: Timer, href: '/mainmenu/adjust-time' },
    ],
  },
  {
    id: 'rpa',
    title: 'RPA',
    icon: Bot,
    children: [
      { id: 'rpa', title: 'Rpa', icon: Bot, href: '/rpa/rpa' },
      { id: 'arrange', title: 'Arrange', icon: Grid, href: '/rpa/arrange' },
    ],
  },
  {
    id: 'report',
    title: 'REPORT',
    icon: FileText,
    children: [
      { id: 'reserve-summary', title: 'Reserve summary', icon: FileText, href: '/report/reserve-summary' },
      { id: 'attendance', title: 'Attendance', icon: Users, href: '/report/attendance' },
      { id: 'comment-feedback', title: 'Comment feedback', icon: MessageSquare, href: '/report/comment-feedback' },
    ],
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: Settings,
    children: [
      { id: 'employee', title: 'Employee', icon: Users, href: '/configuration/employee' },
      { id: 'configuration', title: 'Configuration', icon: Settings, href: '/configuration/configuration' },
      { id: 'zone', title: 'Zone', icon: MapPin, href: '/configuration/zone' },
      { id: 'route-zone', title: 'Route zone', icon: Route, href: '/configuration/route-zone' },
      { id: 'route', title: 'Route', icon: Route, href: '/configuration/route' },
    ],
  },
  {
    id: 'vender-setting',
    title: 'VENDER SETTING',
    icon: Building2,
    children: [
      { id: 'vender', title: 'Vender', icon: Building2, href: '/vender-setting/vender' },
      { id: 'driver', title: 'Driver', icon: User, href: '/vender-setting/driver' },
      { id: 'vehicle', title: 'Vehicle', icon: Car, href: '/vender-setting/vehicle' },
      { id: 'vehicle-type', title: 'Vehicle type', icon: Car, href: '/vender-setting/vehicle-type' },
    ],
  },
  {
    id: 'setting',
    title: 'SETTING',
    icon: Settings,
    children: [
      { id: 'company', title: 'Company', icon: Building, href: '/setting/company' },
      { id: 'organization', title: 'Organization', icon: Building2, href: '/setting/organization' },
      { id: 'employee-type', title: 'Employee type', icon: UserCheck, href: '/setting/employee-type' },
      { id: 'employee-level', title: 'Employee level', icon: UserCheck, href: '/setting/employee-level' },
      { id: 'permission', title: 'Permission', icon: Shield, href: '/setting/permission' },
      { id: 'module', title: 'Module', icon: Package, href: '/setting/module' },
      { id: 'menu-passenger', title: 'Menu passenger', icon: Menu, href: '/setting/menu-passenger' },
      { id: 'coordinator', title: 'Coordinator', icon: Users, href: '/setting/coordinator' },
    ],
  },
];

interface AppSidebarProps {
  isCollapsed: boolean;
  searchQuery?: string;
  className?: string;
}

export function AppSidebar({ isCollapsed, searchQuery = '', className }: AppSidebarProps) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(['dashboard']);

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isActiveMenuItem = (item: MenuItem): boolean => {
    if (item.href && location.pathname === item.href) return true;
    if (item.children) {
      return item.children.some(child => child.href && location.pathname === child.href);
    }
    return false;
  };

  const getCurrentMenuTitle = (): string => {
    for (const item of menuItems) {
      if (item.href && location.pathname === item.href) return item.title;
      if (item.children) {
        const activeChild = item.children.find(child => child.href && location.pathname === child.href);
        if (activeChild) return activeChild.title;
      }
    }
    return 'Dashboard';
  };

  // Filter menu items based on search query
  const filterMenuItem = (item: MenuItem): MenuItem | null => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (item.children) {
      const filteredChildren = item.children
        .map(child => filterMenuItem(child))
        .filter(Boolean) as MenuItem[];
      
      if (matchesSearch || filteredChildren.length > 0) {
        return { ...item, children: filteredChildren };
      }
      return null;
    }
    
    return matchesSearch ? item : null;
  };

  const filteredMenuItems = menuItems
    .map(item => filterMenuItem(item))
    .filter(Boolean) as MenuItem[];

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-primary/20 text-primary font-medium rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  React.useEffect(() => {
    // Auto-expand groups that contain the active route or search results
    for (const item of menuItems) {
      if (item.children && item.children.some(child => child.href && location.pathname === child.href)) {
        if (!openGroups.includes(item.id)) {
          setOpenGroups(prev => [...prev, item.id]);
        }
      }
    }
    
    // Auto-expand groups when searching
    if (searchQuery) {
      const groupsToExpand = filteredMenuItems
        .filter(item => item.children && item.children.length > 0)
        .map(item => item.id);
      setOpenGroups(prev => [...new Set([...prev, ...groupsToExpand])]);
    }
  }, [location.pathname, openGroups, searchQuery, filteredMenuItems]);

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isActiveMenuItem(item);
    const isOpen = openGroups.includes(item.id);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isOpen} onOpenChange={() => toggleGroup(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3 font-normal transition-all duration-200",
                level > 0 && "ml-4 w-[calc(100%-1rem)]",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="truncate">{highlightText(item.title, searchQuery)}</span>
                  <motion.div
                    className="ml-auto"
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-4 space-y-1"
                >
                  {item.children?.map(child => renderMenuItem(child, level + 1))}
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={item.id}
        to={item.href || '#'}
        className={({ isActive }) =>
          cn(
            "flex items-center h-10 px-3 rounded-md font-normal transition-all duration-200",
            level > 0 && "ml-4",
            isActive 
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            isCollapsed && "justify-center px-2"
          )
        }
      >
        <Icon className={cn("h-4 w-4 shrink-0", !isCollapsed && "mr-3")} />
        {!isCollapsed && <span className="truncate">{highlightText(item.title, searchQuery)}</span>}
      </NavLink>
    );
  };

  return (
    <motion.aside
      className={cn(
        "flex flex-col h-screen bg-gradient-sidebar border-r border-sidebar-border",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <motion.div
          className="flex items-center min-w-0"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3 shrink-0">
            <CarIcon className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="font-semibold text-sidebar-foreground truncate">TOGETA MOVE</h1>
              <p className="text-xs text-sidebar-foreground/60 truncate">Reservation System</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-1">
          {searchQuery && filteredMenuItems.length === 0 ? (
            <div className="px-3 py-8 text-center text-sidebar-foreground/60">
              <p className="text-sm">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            (searchQuery ? filteredMenuItems : menuItems).map(item => renderMenuItem(item))
          )}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <motion.div
          className="text-xs text-sidebar-foreground/60 text-center"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!isCollapsed && "© 2024 AdminPro"}
        </motion.div>
      </div>
    </motion.aside>
  );
}

// Export the current menu title function for use in navbar
export const useCurrentMenuTitle = () => {
  const location = useLocation();
  
  for (const item of menuItems) {
    if (item.href && location.pathname === item.href) return item.title;
    if (item.children) {
      const activeChild = item.children.find(child => child.href && location.pathname === child.href);
      if (activeChild) return activeChild.title;
    }
  }
  return 'Dashboard';
};