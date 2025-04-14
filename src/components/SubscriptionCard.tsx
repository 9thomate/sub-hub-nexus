
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck, Clock, Users } from "lucide-react";

export interface SubscriptionProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  slots: {
    total: number;
    available: number;
  };
  status: "active" | "pending" | "inactive";
  eligibleRegions: string[];
  image: string;
}

export const SubscriptionCard: React.FC<SubscriptionProps> = ({
  id,
  title,
  description,
  price,
  currency,
  slots,
  status,
  eligibleRegions,
  image,
}) => {
  const { toast } = useToast();

  const handleJoin = () => {
    toast({
      title: "Request sent!",
      description: `Your request to join ${title} has been sent.`,
    });
  };

  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <CircleCheck className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-amber-500 text-white">Pending</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="gradient-border card-hover">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Users className="mr-1 h-3 w-3" />
                {slots.available}/{slots.total} slots
              </span>
            </div>
          </div>
        </div>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="flex flex-wrap gap-1">
          {eligibleRegions.map((region) => (
            <Badge key={region} variant="outline" className="text-xs">{region}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="font-medium">
          {currency}{price.toFixed(2)} <span className="text-xs text-muted-foreground">per slot</span>
        </div>
        <Button onClick={handleJoin} disabled={slots.available === 0 || status !== "active"}>
          Join Plan
        </Button>
      </CardFooter>
    </Card>
  );
};
