import { GraduationCap, Briefcase, Handshake } from 'lucide-react';
import Logo from './logo';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-[fade-out-loader_1s_ease-out_3s_forwards]">
      <div className="flex flex-col items-center justify-center gap-8">
        <Logo className="text-2xl" />
        <div className="relative w-48 h-16 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-between">
            <div className="animate-[student-walk_3s_ease-in-out_infinite] p-2 bg-secondary rounded-full">
              <GraduationCap className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="animate-[company-appear_3s_ease-in-out_infinite] p-2 bg-primary rounded-full">
                <Briefcase className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-[handshake_3s_ease-in-out_infinite]">
              <Handshake className="w-10 h-10 text-accent-foreground" />
            </div>
          </div>
        </div>
        <p className="text-muted-foreground font-medium animate-pulse">Connecting Talent with Opportunity...</p>
      </div>
    </div>
  );
}
