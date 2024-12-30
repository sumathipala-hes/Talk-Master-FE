import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Calendar } from 'lucide-react';

export function WelcomeCard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Card className="grid md:grid-cols-2 gap-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Purchase a Session</h2>
        <p className="text-muted-foreground">
          Browse our packages and find the perfect one for your learning journey.
        </p>
        <Button className="bg-[#DC2626] hover:bg-[#B91C1C]">
          Activate a Package
        </Button>
      </div>
      <div className="flex justify-center">
        <Calendar className="h-40 w-40 text-muted-foreground" />
      </div>
    </Card>
  );
}