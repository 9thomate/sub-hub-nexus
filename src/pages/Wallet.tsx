
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Bitcoin, 
  CircleDollarSign, 
  CreditCard, 
  History 
} from 'lucide-react';

const transactionHistory = [
  { id: 1, type: 'deposit', amount: 50.00, date: '2023-04-10', status: 'completed', method: 'Paystack' },
  { id: 2, type: 'withdrawal', amount: 25.00, date: '2023-04-08', status: 'completed', method: 'Bank Transfer' },
  { id: 3, type: 'payment', amount: 15.00, date: '2023-04-05', status: 'completed', service: 'Netflix Premium' },
  { id: 4, type: 'deposit', amount: 100.00, date: '2023-04-01', status: 'completed', method: 'Bitcoin' },
  { id: 5, type: 'payment', amount: 5.99, date: '2023-03-28', status: 'completed', service: 'Spotify Family' },
];

const Wallet = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleAddFunds = () => {
    toast({
      title: "Add Funds",
      description: "Fund deposit will be available soon.",
    });
  };

  const handleWithdraw = () => {
    toast({
      title: "Withdraw Funds",
      description: "Withdrawal functionality will be available soon.",
    });
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
                <p className="text-muted-foreground">Manage your funds and transactions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="gradient-border md:col-span-1 bg-gradient-to-br from-familyPlan-burgundy/90 to-familyPlan-roseDust/90 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">Balance</CardTitle>
                    <CardDescription className="text-white/80">Available funds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$105.01</div>
                    <p className="text-sm text-white/80">Last updated: April 10, 2023</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button onClick={handleAddFunds} className="flex-1 bg-white/20 hover:bg-white/30 text-white">
                      <ArrowDownCircle className="mr-2 h-4 w-4" /> Deposit
                    </Button>
                    <Button onClick={handleWithdraw} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                      <ArrowUpCircle className="mr-2 h-4 w-4" /> Withdraw
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="mr-2 h-5 w-5" />
                      Transaction History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="deposits">Deposits</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-4">
                        <div className="space-y-2">
                          {transactionHistory.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center gap-3">
                                {transaction.type === 'deposit' && <ArrowDownCircle className="h-5 w-5 text-green-500" />}
                                {transaction.type === 'withdrawal' && <ArrowUpCircle className="h-5 w-5 text-amber-500" />}
                                {transaction.type === 'payment' && <CircleDollarSign className="h-5 w-5 text-blue-500" />}
                                <div>
                                  <p className="font-medium">
                                    {transaction.type === 'deposit' && 'Deposit'}
                                    {transaction.type === 'withdrawal' && 'Withdrawal'}
                                    {transaction.type === 'payment' && `Payment for ${transaction.service}`}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {transaction.date} • {transaction.method}
                                  </p>
                                </div>
                              </div>
                              <div className={`font-medium ${
                                transaction.type === 'deposit' ? 'text-green-500' : 
                                transaction.type === 'withdrawal' ? 'text-amber-500' : 
                                'text-blue-500'
                              }`}>
                                {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="deposits" className="mt-4">
                        <div className="space-y-2">
                          {transactionHistory
                            .filter(t => t.type === 'deposit')
                            .map((transaction) => (
                              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                  <ArrowDownCircle className="h-5 w-5 text-green-500" />
                                  <div>
                                    <p className="font-medium">Deposit</p>
                                    <p className="text-sm text-muted-foreground">
                                      {transaction.date} • {transaction.method}
                                    </p>
                                  </div>
                                </div>
                                <div className="font-medium text-green-500">
                                  +${transaction.amount.toFixed(2)}
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="payments" className="mt-4">
                        <div className="space-y-2">
                          {transactionHistory
                            .filter(t => t.type === 'payment')
                            .map((transaction) => (
                              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                  <CircleDollarSign className="h-5 w-5 text-blue-500" />
                                  <div>
                                    <p className="font-medium">Payment for {transaction.service}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {transaction.date}
                                    </p>
                                  </div>
                                </div>
                                <div className="font-medium text-blue-500">
                                  -${transaction.amount.toFixed(2)}
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Paystack</p>
                            <p className="text-sm text-muted-foreground">Connect your bank card</p>
                          </div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Bitcoin className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Binance Pay</p>
                            <p className="text-sm text-muted-foreground">Pay with crypto</p>
                          </div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Escrow Funds</CardTitle>
                    <CardDescription>Funds held until subscription lifecycle completion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png" alt="Netflix" className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">Netflix Premium</p>
                            <p className="text-sm text-muted-foreground">Release date: Dec 15, 2023</p>
                          </div>
                        </div>
                        <div className="font-medium">$47.92</div>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Spotify-512.png" alt="Spotify" className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">Spotify Family</p>
                            <p className="text-sm text-muted-foreground">Release date: Aug 30, 2023</p>
                          </div>
                        </div>
                        <div className="font-medium">$30.00</div>
                      </div>
                    </div>
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

export default Wallet;
