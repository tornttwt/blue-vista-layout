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
    title: 'Dashboard',
    icon: Home,
    href: '/',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3,
    children: [
      { id: 'overview', title: 'Overview', icon: TrendingUp, href: '/analytics/overview' },
      { id: 'reports', title: 'Reports', icon: FileText, href: '/analytics/reports' },
      { id: 'insights', title: 'Insights', icon: Zap, href: '/analytics/insights' },
    ],
  },
  {
    id: 'users',
    title: 'User Management',
    icon: Users,
    children: [
      { id: 'all-users', title: 'All Users', icon: Users, href: '/users' },
      { id: 'permissions', title: 'Permissions', icon: Shield, href: '/users/permissions' },
      { id: 'roles', title: 'Roles', icon: UserCheck, href: '/users/roles' },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    icon: Package,
    children: [
      { id: 'catalog', title: 'Catalog', icon: Package, href: '/products/catalog' },
      { id: 'inventory', title: 'Inventory', icon: Database, href: '/products/inventory' },
      { id: 'shipping', title: 'Shipping', icon: Truck, href: '/products/shipping' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance',
    icon: CreditCard,
    children: [
      { id: 'payments', title: 'Payments', icon: CreditCard, href: '/finance/payments' },
      { id: 'billing', title: 'Billing', icon: FileText, href: '/finance/billing' },
      { id: 'invoices', title: 'Invoices', icon: FileText, href: '/finance/invoices' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    icon: Globe,
    children: [
      { id: 'campaigns', title: 'Campaigns', icon: Mail, href: '/marketing/campaigns' },
      { id: 'analytics', title: 'Analytics', icon: BarChart3, href: '/marketing/analytics' },
      { id: 'automation', title: 'Automation', icon: Zap, href: '/marketing/automation' },
    ],
  },
  {
    id: 'content',
    title: 'Content Management',
    icon: FileText,
    children: [
      { id: 'pages', title: 'Pages', icon: FileText, href: '/content/pages' },
      { id: 'media', title: 'Media Library', icon: Layers, href: '/content/media' },
      { id: 'templates', title: 'Templates', icon: Monitor, href: '/content/templates' },
    ],
  },
  {
    id: 'organization',
    title: 'Organization',
    icon: Building2,
    children: [
      { id: 'departments', title: 'Departments', icon: Building2, href: '/organization/departments' },
      { id: 'calendar', title: 'Calendar', icon: Calendar, href: '/organization/calendar' },
      { id: 'communication', title: 'Communication', icon: Mail, href: '/organization/communication' },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    children: [
      { id: 'general', title: 'General', icon: Settings, href: '/settings/general' },
      { id: 'security', title: 'Security', icon: Shield, href: '/settings/security' },
      { id: 'integrations', title: 'Integrations', icon: Zap, href: '/settings/integrations' },
    ],
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    children: [
      { id: 'documentation', title: 'Documentation', icon: FileText, href: '/help/docs' },
      { id: 'support', title: 'Support Tickets', icon: HelpCircle, href: '/help/support' },
      { id: 'community', title: 'Community', icon: Users, href: '/help/community' },
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
            <Package className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="font-semibold text-sidebar-foreground truncate">AdminPro</h1>
              <p className="text-xs text-sidebar-foreground/60 truncate">Management System</p>
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