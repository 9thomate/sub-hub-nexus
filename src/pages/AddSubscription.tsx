import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Check, ChevronsUpDown, Info, Upload } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "ng", label: "Nigeria" },
  { value: "za", label: "South Africa" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
];

const services = [
  { value: "netflix", label: "Netflix" },
  { value: "spotify", label: "Spotify" },
  { value: "disney", label: "Disney+" },
  { value: "hbo", label: "HBO Max" },
  { value: "apple", label: "Apple One" },
  { value: "amazon", label: "Amazon Prime" },
  { value: "youtube", label: "YouTube Premium" },
  { value: "microsoft", label: "Microsoft 365" },
  { value: "ps", label: "PlayStation Plus" },
  { value: "nintendo", label: "Nintendo Switch Online" },
  { value: "ea", label: "EA Play" },
  { value: "other", label: "Other" },
];

const AddSubscription = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Your subscription has been submitted for review.",
    });
  };

  return (
    <div className="min-h-screen flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Add Subscription</h1>
                <p className="text-muted-foreground">
                  Share your family plan subscription and earn money
                </p>
              </div>

              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                    <CardDescription>
                      Enter the details of your family plan subscription
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="service">Service</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  {service.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="plan">Plan Type</Label>
                          <Input id="plan" placeholder="e.g. Premium, Family, etc." />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Describe your subscription (e.g. features, benefits, etc.)" 
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price per Slot ($)</Label>
                          <Input id="price" type="number" placeholder="0.00" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="slots">Total Available Slots</Label>
                          <Input id="slots" type="number" placeholder="0" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        Eligible Regions
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                                <Info className="h-3 w-3" />
                                <span className="sr-only">Info</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="start">
                              <p className="text-sm">
                                Some services have regional restrictions. Select the countries where your subscription can be used.
                              </p>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </Label>

                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {selectedCountries.length > 0
                              ? `${selectedCountries.length} countries selected`
                              : "Select countries"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                              <CommandItem
                                value="all"
                                onSelect={() => {
                                  if (selectedCountries.length === countries.length) {
                                    setSelectedCountries([]);
                                  } else {
                                    setSelectedCountries(countries.map(c => c.value));
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCountries.length === countries.length
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {selectedCountries.length === countries.length ? "Deselect All" : "Select All"}
                              </CommandItem>
                              {countries.map((country) => (
                                <CommandItem
                                  key={country.value}
                                  onSelect={() => {
                                    setSelectedCountries(
                                      selectedCountries.includes(country.value)
                                        ? selectedCountries.filter(c => c !== country.value)
                                        : [...selectedCountries, country.value]
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedCountries.includes(country.value)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {country.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Separator />
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Verification</Label>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">
                          Please provide proof of subscription ownership (e.g. screenshot of account, invoice, etc.)
                        </p>
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="font-medium">Drop files or click to upload</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supported formats: JPG, PNG, PDF (max 5MB)
                          </p>
                          <Input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            accept=".jpg,.jpeg,.png,.pdf"
                          />
                          <Label htmlFor="file-upload" className="mt-4">
                            <Button type="button" variant="outline">Select File</Button>
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                  </CardContent>
                  <CardFooter className="border-t p-6">
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 w-full">
                      <Button variant="outline">Cancel</Button>
                      <Button type="submit" className="bg-familyPlan-burgundy hover:bg-familyPlan-burgundy/90">Submit for Review</Button>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AddSubscription;
