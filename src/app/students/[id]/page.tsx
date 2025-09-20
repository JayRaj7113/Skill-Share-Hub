import { notFound } from 'next/navigation';
import Image from 'next/image';
import { students } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, GraduationCap, Code } from 'lucide-react';
import SuggestedProjects from '@/components/ai/suggested-projects';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-40 bg-gradient-to-r from-primary to-accent">
            <Image
              src={student.avatarUrl}
              alt={student.name}
              width={128}
              height={128}
              className="absolute bottom-0 left-6 translate-y-1/2 w-32 h-32 rounded-full border-4 border-background"
              data-ai-hint="portrait person"
            />
          </div>
          <div className="pt-20 pb-6 px-6">
            <h1 className="text-3xl font-bold">{student.name}</h1>
            <p className="text-muted-foreground">{student.bio}</p>
          </div>
          <div className="border-t px-6 py-4 space-y-4">
             <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>{student.college}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-6 w-6" />
                <span>Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {student.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-base">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>AI Suggested Projects</CardTitle>
              <CardDescription>Projects matched to your profile by our AI assistant.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<SuggestedProjectsSkeleton />}>
                <SuggestedProjects studentProfile={student} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SuggestedProjectsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
