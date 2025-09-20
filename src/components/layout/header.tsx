import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        
        <nav className="flex-1 flex items-center justify-between">
          <div className="md:hidden">
             <Link href="/">
                <Logo />
             </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/projects">Browse Projects</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/students/search">Find Talent</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/register">Register as Student</Link>
            </Button>
            <Button asChild>
              <Link href="/projects/new">Post a Project</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
