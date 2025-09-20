'use client';

import { useFormState } from 'react-dom';
import { searchStudentAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function SearchForm() {
  const [state, formAction] = useFormState(searchStudentAction, { errors: {} });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Search</CardTitle>
        <CardDescription>
          Example IDs: 123AB, 456CD, 789EF
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              name="studentId" 
              placeholder="Enter student ID..." 
              className="pl-10 font-mono tracking-widest"
              maxLength={5}
            />
          </div>
          {state?.errors?.studentId && (
            <p className="text-sm font-medium text-destructive mt-2">{state.errors.studentId[0]}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Search</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
