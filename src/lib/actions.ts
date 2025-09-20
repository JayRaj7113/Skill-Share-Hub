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
  cgpa: z.string().regex(/^\d\.\d{1,2}$/, 'Enter a valid CGPA (e.g., 3.8)'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  skills: z.string().min(1, 'Please list at least one skill'),
  achievements: z.string().min(1, 'Please list at least one achievement'),
});

export async function registerStudentAction(prevState: any, formData: FormData) {
  const validatedFields = registrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    college: formData.get('college'),
    cgpa: formData.get('cgpa'),
    bio: formData.get('bio'),
    skills: formData.get('skills'),
    achievements: formData.get('achievements'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real app, you'd save this to a database.
  const studentId = `${Math.floor(100 + Math.random() * 900)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  console.log('New Student Registered:', { id: studentId, ...validatedFields.data });
  
  redirect(`/students/${studentId}`);
}


const searchSchema = z.object({
  studentId: z.string().regex(/^\d{3}[A-Z]{2}$/, 'Invalid ID format. Must be 3 numbers followed by 2 letters (e.g., 123AB).'),
});

export async function searchStudentAction(prevState: any, formData: FormData) {
  const studentId = (formData.get('studentId') as string)?.toUpperCase();
  const validatedFields = searchSchema.safeParse({ studentId });
  

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
      errors: { studentId: ['Student not found. Try one of: 123AB, 456CD, 789EF'] },
    };
  }
}
