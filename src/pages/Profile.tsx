
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockSubscriptions } from '@/data/mockSubscriptions';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Edit, Wallet, CreditCard } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing will be available soon.",
    });
  };

  return (
    <div className="min-h-screen flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">Manage your account and subscriptions</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="gradient-border col-span-1">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Your personal information</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleEditProfile}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-4 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-sm text-muted-foreground mb-2">johndoe@example.com</p>
                    <Badge className="bg-familyPlan-steelBlue">Original Buyer</Badge>
                  </CardContent>
                  <CardFooter className="flex justify-center gap-3 border-t pt-4">
                    <Button variant="outline" size="sm" className="flex gap-1">
                      <Wallet className="h-4 w-4" />
                      Wallet
                    </Button>
                    <Button variant="outline" size="sm" className="flex gap-1">
                      <CreditCard className="h-4 w-4" />
                      Payment
                    </Button>
                  </CardFooter>
                </Card>

                {/* Subscriptions Section */}
                <Card className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>My Subscriptions</CardTitle>
                    <CardDescription>Manage your subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="owned">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="owned">Owned</TabsTrigger>
                        <TabsTrigger value="joined">Joined</TabsTrigger>
                      </TabsList>
                      <TabsContent value="owned">
                        <div className="space-y-4">
                          {mockSubscriptions
                            .filter(sub => sub.status !== "inactive")
                            .slice(0, 2)
                            .map(subscription => (
                              <SubscriptionCard 
                                key={subscription.id} 
                                {...subscription as any} // Using type assertion to fix the type issue temporarily
                              />
                            ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="joined">
                        <div className="space-y-4">
                          {mockSubscriptions
                            .filter(sub => sub.status === "active")
                            .slice(2, 4)
                            .map(subscription => (
                              <SubscriptionCard 
                                key={subscription.id} 
                                {...subscription as any} // Using type assertion to fix the type issue temporarily
                              />
                            ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Profile;
