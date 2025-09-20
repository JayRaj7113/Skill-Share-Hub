import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Header() {
  const navLinks = [
    { href: '/projects', label: 'Browse Projects' },
    { href: '/students/search', label: 'Recruiters Panel' },
    { href: '/dashboard', label: 'Career Counselor' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                        <span className="sr-only">Toggle Navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs">
                    <div className="p-4">
                        <Link href="/" className="mb-8 block">
                            <Logo />
                        </Link>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <Button variant="ghost" asChild key={link.href} className="justify-start">
                                    <Link href={link.href}>{link.label}</Link>
                                </Button>
                            ))}
                        </nav>
                        <div className="mt-8 flex flex-col gap-2">
                             <Button variant="outline" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center justify-between">
            <div className="flex items-center gap-4">
                {navLinks.map(link => (
                    <Button variant="ghost" asChild key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </Button>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
          </div>
        </nav>

        <div className="flex flex-1 items-center justify-end md:hidden">
            <Link href="/">
                <Logo />
            </Link>
        </div>

      </div>
    </header>
  );
}
