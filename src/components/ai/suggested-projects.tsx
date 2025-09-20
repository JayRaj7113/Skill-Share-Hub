import { projects } from '@/lib/data';
import type { Student } from '@/lib/types';
import { suggestProjects, SuggestProjectsInput } from '@/ai/flows/ai-suggested-projects';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

type SuggestedProjectsProps = {
  studentProfile: Student;
};

export default async function SuggestedProjects({ studentProfile }: SuggestedProjectsProps) {
  const input: SuggestProjectsInput = {
    studentProfile,
    projects,
  };

  let suggestions = [];
  try {
    suggestions = await suggestProjects(input);
  } catch (error) {
    console.error("AI suggestion failed:", error);
    return (
        <Card className="bg-destructive/10 border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive">An Error Occurred</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Could not load AI project suggestions at this time.</p>
            </CardContent>
        </Card>
    );
  }
  
  if (!suggestions || suggestions.length === 0) {
    return <p>No project suggestions available right now.</p>;
  }
  
  const sortedSuggestions = suggestions.sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-4">
      {sortedSuggestions.map(({ project, matchScore, justification }) => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <div className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{project.title}</h3>
              <Badge variant={matchScore > 0.8 ? 'default' : 'secondary'}>
                {Math.round(matchScore * 100)}% Match
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{justification}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
