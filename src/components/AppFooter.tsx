import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AppFooterProps {
  className?: string;
}

export function AppFooter({ className }: AppFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={cn(
        "mt-auto border-t border-border bg-background/95 backdrop-blur-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Section - Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Powered 💎 by eTraveling  TT Techno Park Co.,Ltd.</span>
            {/* <span className="hidden sm:inline">Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className="hidden sm:inline">by our team</span> */}
          </div>

          {/* Center Section - Links */}
          {/* <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Support
            </a>
          </div> */}

          {/* Right Section - Social Links */}
          {/* <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Mail className="h-4 w-4" />
            </Button>
          </div> */}
        </div>

        {/* Additional Footer Content */}
        {/* <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Version 2.1.0</span>
              <span>•</span>
              <span>Last updated: Dec 2024</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Status: All systems operational</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div> */}
      </div>
    </motion.footer>
  );
}