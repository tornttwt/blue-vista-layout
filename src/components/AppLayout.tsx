import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from './AppSidebar';
import { AppNavbar } from './AppNavbar';
import { AppFooter } from './AppFooter';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMainMenu, setActiveMainMenu] = useState("dashboard"); // ✅ state สำหรับ main menu
    const isMobile = useIsMobile();
  
    // Auto-collapse sidebar on mobile
    useEffect(() => {
      if (isMobile) {
        setIsCollapsed(true);
        setIsMobileMenuOpen(false);
      }
    }, [isMobile]);
  
    const toggleSidebar = () => {
      if (isMobile) {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
  
    const closeMobileMenu = () => {
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    };
  
    return (
      <div className={cn("h-screen bg-background flex flex-col", className)}>
        <div className="flex flex-1 relative overflow-hidden">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <AppSidebar
              isCollapsed={isCollapsed}
              searchQuery={searchQuery}
              activeMainMenu={activeMainMenu} // ✅ ส่ง main menu
              className="shrink-0 hidden md:flex h-full"
            />
          )}
  
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isMobile && isMobileMenuOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/50 z-40 md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeMobileMenu}
                />
                <motion.div
                  className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
                  initial={{ x: -256 }}
                  animate={{ x: 0 }}
                  exit={{ x: -256 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  <div className="relative h-full">
                    <AppSidebar
                      isCollapsed={false}
                      searchQuery={searchQuery}
                      activeMainMenu={activeMainMenu} // ✅
                      className="h-full shadow-xl"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={closeMobileMenu}
                      className="absolute top-4 right-4 text-sidebar-foreground hover:bg-sidebar-accent/50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
  
          {/* Main Content */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Navbar */}
            <AppNavbar
              isCollapsed={isCollapsed}
              onToggleSidebar={toggleSidebar}
              isMobile={isMobile}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeMainMenu={activeMainMenu}          // ✅
              onMainMenuChange={setActiveMainMenu}    // ✅
            />
  
            <main className="flex-1 p-6 overflow-auto">
              <motion.div
                className="max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {children}
              </motion.div>
            </main>
  
            <AppFooter />
          </div>
        </div>
      </div>
    );
  }