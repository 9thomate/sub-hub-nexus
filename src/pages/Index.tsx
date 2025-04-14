
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { mockSubscriptions } from '@/data/mockSubscriptions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, Filter } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return subscription.status === "active";
    if (activeTab === "pending") return subscription.status === "pending";
    return true;
  }).filter(subscription => {
    if (statusFilter.length === 0) return true;
    return statusFilter.includes(subscription.status);
  });

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Subscription Marketplace</h1>
                <p className="text-muted-foreground">
                  Browse and join family plan subscriptions at reduced costs
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Tabs 
                    defaultValue="all" 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex gap-1">
                          <Filter className="h-4 w-4" />
                          Filter
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('active')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setStatusFilter([...statusFilter, 'active']);
                            } else {
                              setStatusFilter(statusFilter.filter(s => s !== 'active'));
                            }
                          }}
                        >
                          Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('pending')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setStatusFilter([...statusFilter, 'pending']);
                            } else {
                              setStatusFilter(statusFilter.filter(s => s !== 'pending'));
                            }
                          }}
                        >
                          Pending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('inactive')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setStatusFilter([...statusFilter, 'inactive']);
                            } else {
                              setStatusFilter(statusFilter.filter(s => s !== 'inactive'));
                            }
                          }}
                        >
                          Inactive
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="bg-familyPlan-burgundy hover:bg-familyPlan-burgundy/90 w-full sm:w-auto">
                      Add Subscription
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((subscription) => (
                      <SubscriptionCard key={subscription.id} {...subscription} />
                    ))
                  ) : (
                    <div className="col-span-full flex justify-center py-10">
                      <p className="text-muted-foreground">No subscriptions found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
