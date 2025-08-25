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

interface AppSidebarProps {
    isCollapsed: boolean;
    searchQuery?: string;
    activeMainMenu: string;   // ✅ main menu ที่เลือก
    className?: string;
  }

  interface MenuItem { id: string; title: string; icon: React.ComponentType<any>; href?: string; children?: MenuItem[]; }

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
    title: 'CONFIGURATION',
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

export function AppSidebar({
    isCollapsed,
    searchQuery = '',
    activeMainMenu,
    className
  }: AppSidebarProps) {
    const location = useLocation();
  
    // ✅ หา main menu ที่เลือก
    const mainMenu = menuItems.find(item => item.id === activeMainMenu);
    const subMenus = mainMenu?.children || [];
  
    // ✅ filter submenu ด้วย searchQuery
    const filteredSubMenus = subMenus.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <motion.aside
        className={cn(
          "flex flex-col h-screen bg-gradient-sidebar border-r border-sidebar-border",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="min-w-0">
            <h1 className="font-semibold text-sidebar-foreground truncate">TOGETA MOVE</h1>
            <p className="text-xs text-sidebar-foreground/60 truncate">Reservation System</p>
          </div>
          )}
        </div>
  
        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {filteredSubMenus.map(item => (
              <NavLink
                key={item.id}
                to={item.href || "#"}
                className="flex items-center h-10 px-3 rounded-md hover:bg-sidebar-accent/50"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {!isCollapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
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
