
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Home, 
  PlusCircle, 
  MessageSquare, 
  Banknote, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, isActive }: SidebarItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md w-full transition-colors duration-200",
        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      )}>
        <a href={path}>
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const AppSidebar = () => {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  const pathname = window.location.pathname;
  
  return (
    <Sidebar>
      <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 text-sidebar-foreground font-semibold text-xl">
          <img src="/lovable-uploads/4e03ca55-ab04-4172-9cbb-f06c3014cef1.png" alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="text-sidebar-foreground">Family Plan</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="ml-auto p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
      </div>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem icon={Home} label="Dashboard" path="/" isActive={pathname === '/'} />
              <SidebarItem icon={PlusCircle} label="Add Subscription" path="/add-subscription" isActive={pathname === '/add-subscription'} />
              <SidebarItem icon={MessageSquare} label="Messages" path="/messages" isActive={pathname === '/messages'} />
              <SidebarItem icon={Banknote} label="Wallet" path="/wallet" isActive={pathname === '/wallet'} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem icon={User} label="Profile" path="/profile" isActive={pathname === '/profile'} />
              <SidebarItem icon={Settings} label="Settings" path="/settings" isActive={pathname === '/settings'} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent className="mt-auto">
            <SidebarMenu>
              <SidebarItem icon={HelpCircle} label="Help & Support" path="/help" isActive={pathname === '/help'} />
              <SidebarItem icon={LogOut} label="Logout" path="/logout" isActive={pathname === '/logout'} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
