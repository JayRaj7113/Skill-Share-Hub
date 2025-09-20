'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerStudentAction } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  college: z.string().min(3, 'College name is required'),
  cgpa: z.string().regex(/^\d\.\d{1,2}$/, 'Enter a valid CGPA (e.g., 3.8)'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  skills: z.string().min(1, 'Please list at least one skill'),
  achievements: z.string().min(1, 'Please list at least one achievement'),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const [state, formAction] = useFormState(registerStudentAction, { errors: {} });

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      college: '',
      cgpa: '',
      bio: '',
      skills: '',
      achievements: '',
      ...state,
    },
  });

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., jane.doe@university.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College or University</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., State University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current CGPA</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3.85" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself, your passions, and your goals."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Python, UI/UX Design" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your skills, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Won 1st place at Hackathon X, Published a research paper"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>
                    Enter your achievements, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="lg">Create Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
