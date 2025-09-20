import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Terminal className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">Skill Share Hub</span>
    </div>
  );
}
