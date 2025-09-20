'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PartyPopper } from 'lucide-react';

export default function InterestButton() {
  const { toast } = useToast();

  const handleInterest = () => {
    toast({
      title: 'Success!',
      description: "Your interest has been noted. The company will be notified.",
      action: <PartyPopper className="h-5 w-5 text-primary" />,
    });
  };

  return (
    <Button onClick={handleInterest} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      Indicate Interest
    </Button>
  );
}
