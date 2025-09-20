'use server';

import { z } from 'zod';
import { students } from './data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  reward: z.string().min(1, 'Reward is required'),
  deadline: z.date(),
});

export async function createProjectAction(prevState: any, formData: FormData) {
  const validatedFields = projectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    reward: formData.get('reward'),
    deadline: new Date(formData.get('deadline') as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // In a real app, you'd save this to a database.
  console.log('New Project Submitted:', validatedFields.data);
  revalidatePath('/projects');
  redirect('/projects');
}


const registrationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  college: z.string().min(3, 'College name is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  skills: z.string().min(1, 'Please list at least one skill'),
});

export async function registerStudentAction(prevState: any, formData: FormData) {
  const validatedFields = registrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    college: formData.get('college'),
    bio: formData.get('bio'),
    skills: formData.get('skills'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real app, you'd save this to a database and create a unique ID.
  const studentId = validatedFields.data.name.toLowerCase().replace(/\s+/g, '-');
  console.log('New Student Registered:', { id: studentId, ...validatedFields.data });
  
  redirect(`/students/${studentId}`);
}


const searchSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
});

export async function searchStudentAction(prevState: any, formData: FormData) {
  const validatedFields = searchSchema.safeParse({
    studentId: formData.get('studentId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const foundStudent = students.find(s => s.id === validatedFields.data.studentId);

  if (foundStudent) {
    redirect(`/students/${foundStudent.id}`);
  } else {
    return {
      errors: { studentId: ['Student not found. Try one of: ana-garcia, james-smith, priya-patel'] },
    };
  }
}
