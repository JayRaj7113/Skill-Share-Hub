import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';
import { Calendar, Users } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const companyId = project.companyName.toLowerCase().replace(/\s+/g, '-').replace(/inc\.?/, '');
  
  return (
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 mb-2 flex-grow">
              <Link href={`/companies/${companyId}`} className="block flex-shrink-0">
                  <Image 
                    src={project.companyLogoUrl} 
                    alt={`${project.companyName} logo`} 
                    width={40} 
                    height={40}
                    className="rounded-full"
                    data-ai-hint="logo"
                  />
              </Link>
              <div className="flex-grow">
                 <Link href={`/projects/${project.id}`} className="block">
                    <CardTitle className="text-xl hover:underline">{project.title}</CardTitle>
                 </Link>
                <Link href={`/companies/${companyId}`} className="block">
                  <CardDescription className="hover:underline">{project.companyName}</CardDescription>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground pt-2">
            <div className="flex items-center">
              <span>{project.reward}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{project.submissions} submissions</span>
            </div>
          </div>
        </CardHeader>
        <Link href={`/projects/${project.id}`} className="block flex-grow">
            <CardContent className="flex-grow">
            <p className="text-muted-foreground line-clamp-3">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.requirements.slice(0, 3).map((req) => (
                <Badge key={req} variant="secondary">{req}</Badge>
                ))}
            </div>
            </CardContent>
        </Link>
        <Link href={`/projects/${project.id}`} className="block">
            <CardFooter>
            <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
            </div>
            </CardFooter>
        </Link>
      </Card>
  );
}
