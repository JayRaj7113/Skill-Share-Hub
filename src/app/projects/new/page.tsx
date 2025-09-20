import ProjectForm from '@/components/projects/project-form';

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Post a New Project</h1>
        <p className="text-muted-foreground mt-2">
          Describe your project to attract the best student talent.
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
