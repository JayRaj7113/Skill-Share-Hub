import { projects } from '@/lib/data';
import ProjectCard from '@/components/projects/project-card';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Available Projects</h1>
        <p className="text-muted-foreground mt-2">Find your next challenge and gain real-world experience.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
