import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Award, Target } from 'lucide-react';
import SubmissionForm from '@/components/projects/submission-form';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  src={project.companyLogoUrl}
                  alt={`${project.companyName} logo`}
                  width={60}
                  height={60}
                  className="rounded-lg"
                  data-ai-hint="logo"
                />
                <div>
                  <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
                  <p className="text-lg text-muted-foreground">{project.companyName}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{project.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6" />
                <span>Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.requirements.map((req) => (
                <Badge key={req} variant="default" className="text-sm px-3 py-1">
                  {req}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6" />
                <span>Project Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="font-bold text-primary mt-1">₹</span>
                <div>
                  <p className="font-semibold">Reward</p>
                  <p className="text-muted-foreground">{project.reward}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Deadline</p>
                  <p className="text-muted-foreground">
                    {new Date(project.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
               <div className="flex items-start gap-3">
                <Users className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Submissions</p>
                  <p className="text-muted-foreground">{project.submissions} received</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <SubmissionForm />
        </div>
      </div>
    </div>
  );
}
