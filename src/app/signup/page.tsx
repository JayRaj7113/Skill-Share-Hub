import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Join Skill Share Hub</h1>
        <p className="text-muted-foreground mt-2">
          Choose your role to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link href="/register">
          <Card className="h-full flex flex-col items-center justify-center text-center p-8 hover:shadow-xl hover:border-primary hover:bg-primary/5 transition-all">
            <GraduationCap className="h-16 w-16 text-primary mb-4" />
            <CardHeader>
              <CardTitle className="text-2xl">I'm a Student</CardTitle>
              <CardDescription>
                Create a profile, showcase your skills, and find projects to gain real-world experience.
              </CardDescription>
            </CardHeader>
            <ArrowRight className="h-6 w-6 text-muted-foreground mt-4" />
          </Card>
        </Link>
        <Link href="/register/company">
          <Card className="h-full flex flex-col items-center justify-center text-center p-8 hover:shadow-xl hover:border-primary hover:bg-primary/5 transition-all">
            <Briefcase className="h-16 w-16 text-primary mb-4" />
            <CardHeader>
              <CardTitle className="text-2xl">I'm a Company</CardTitle>
              <CardDescription>
                Post projects, find motivated talent, and get your work done by the next generation of professionals.
              </CardDescription>
            </CardHeader>
             <ArrowRight className="h-6 w-6 text-muted-foreground mt-4" />
          </Card>
        </Link>
      </div>
    </div>
  );
}
