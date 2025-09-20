'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopper } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function SubmissionForm() {
  const { toast } = useToast();
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!link && !file) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'Please provide a link or upload a file.',
      });
      return;
    }
    
    // In a real app, you would handle the form submission,
    // e.g., upload the file or send the link to your backend.
    console.log('Submission:', { link, file: file?.name });
    
    toast({
      title: 'Success!',
      description: 'Your project submission has been received.',
      action: <PartyPopper className="h-5 w-5 text-primary" />,
    });

    // Reset form
    setLink('');
    setFile(null);
    const fileInput = document.getElementById('project-file') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Submit Your Work</CardTitle>
            <CardDescription>Provide a link or upload your project.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="project-link">Website or GitHub Link</Label>
                    <Input
                        id="project-link"
                        type="url"
                        placeholder="https://github.com/your/repo"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        disabled={!!file}
                    />
                </div>

                <div className="relative flex items-center justify-center my-4">
                    <Separator className="shrink" />
                    <span className="bg-card px-2 text-sm text-muted-foreground">OR</span>
                    <Separator className="shrink" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project-file">Upload Project (ZIP)</Label>
                    <Input
                        id="project-file"
                        type="file"
                        accept=".zip"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        disabled={!!link}
                    />
                </div>
                
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}
