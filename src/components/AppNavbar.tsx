import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    Search,
    Bell,
    LogOut,
  } from 'lucide-react';

interface AppNavbarProps {
    isCollapsed: boolean;
    onToggleSidebar: () => void;
    isMobile?: boolean;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeMainMenu: string;               // ✅ main menu ที่เลือก
    onMainMenuChange: (id: string) => void; // ✅ callback เวลาเปลี่ยน main menu
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

export function AppNavbar({
    isCollapsed,
    onToggleSidebar,
    isMobile = false,
    searchQuery,
    onSearchChange,
    activeMainMenu,
    onMainMenuChange,
    className
  }: AppNavbarProps) {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const customerName = "Toyota Motor Asia (TMA)";
  
    const handleSearch = (e: React.FormEvent) => e.preventDefault();
  
    // ✅ แสดง main menu items ที่มี children เท่านั้น
    const mainMenus = menuItems.filter(item => item.children);
  
    return (
      <motion.header
        className={cn(
          "flex items-center justify-between h-16 px-4 bg-navbar border-b border-navbar-border",
          "sticky top-0 z-40 backdrop-blur-sm bg-navbar/95",
          className
        )}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4 min-w-0">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
  
          
        </div>
  
        {/* Center Search */}
        {/* ✅ Main Menu Items */}
        <nav className="hidden md:flex gap-4">
            {mainMenus.map(menu => (
              <Button
                key={menu.id}
                variant={activeMainMenu === menu.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onMainMenuChange(menu.id)}
              >
                {menu.title}
              </Button>
            ))}
          </nav>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        {/* <div className="md:hidden">
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
        </div> */}

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
        {/* <Button variant="ghost" size="sm" className="text-navbar-foreground relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button> */}

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