
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-9xl font-bold text-familyPlan-burgundy">404</h1>
              <p className="text-xl text-muted-foreground mt-4 mb-6">Oops! Page not found</p>
              <Button asChild className="bg-familyPlan-burgundy hover:bg-familyPlan-burgundy/90">
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default NotFound;
