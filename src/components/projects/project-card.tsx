import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';
import { Calendar, DollarSign } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-4 mb-2">
            <Image 
              src={project.companyLogoUrl} 
              alt={`${project.companyName} logo`} 
              width={40} 
              height={40}
              className="rounded-full"
              data-ai-hint="logo"
            />
            <CardTitle className="text-xl">{project.title}</CardTitle>
          </div>
          <CardDescription>{project.companyName}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.requirements.slice(0, 3).map((req) => (
              <Badge key={req} variant="secondary">{req}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{project.reward}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
