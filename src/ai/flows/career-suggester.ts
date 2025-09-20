'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests a career path to a user based on their interests and skills.
 *
 * @exports suggestCareerPath - An async function that takes user inputs and returns a detailed career path recommendation.
 * @exports CareerPathInput - The input type for the suggestCareerPath function.
 * @exports CareerPathOutput - The output type for the suggestCareerPath function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CareerPathInputSchema = z.object({
  interest: z.string().describe('The user\'s primary interest (e.g., building, problem-solving).'),
  subject: z.string().describe('The user\'s favorite or strongest subject (e.g., math, arts).'),
});
export type CareerPathInput = z.infer<typeof CareerPathInputSchema>;

const CareerPathOutputSchema = z.object({
    careerField: z.string().describe("The suggested career field, like 'Software Engineering' or 'Graphic Design'."),
    justification: z.string().describe("A brief explanation of why this field is a good match for the user."),
    inDemandSkills: z.array(z.string()).describe("A list of 3-5 key in-demand skills for this career."),
    topCompanies: z.array(z.string()).describe("A list of 3-5 top companies known for hiring in this field."),
    careerPath: z.array(z.object({
        step: z.number().describe("The step number in the career path."),
        title: z.string().describe("The title of the career path step."),
        description: z.string().describe("A brief description of the career path step."),
    })).describe("A 4-step guide to starting a career in this field."),
});
export type CareerPathOutput = z.infer<typeof CareerPathOutputSchema>;


export async function suggestCareerPath(input: CareerPathInput): Promise<CareerPathOutput> {
    return suggestCareerPathFlow(input);
}


const suggestCareerPathPrompt = ai.definePrompt({
    name: 'suggestCareerPathPrompt',
    input: { schema: CareerPathInputSchema },
    output: { schema: CareerPathOutputSchema },
    prompt: `You are a career counselor AI for students. Based on the user's interest in '{{{interest}}}' and their strength in '{{{subject}}}', suggest a specific and relevant career field.

    Provide the following details for the suggested career field:
    1.  **careerField**: A specific job title or field.
    2.  **justification**: A concise (1-2 sentences) reason why this is a good fit.
    3.  **inDemandSkills**: A list of 3-5 specific, in-demand skills.
    4.  **topCompanies**: A list of 3-5 real-world companies known for hiring in this field.
    5.  **careerPath**: A practical, 4-step guide for a student to enter this field. Each step should have a title and a short description.

    Your response must be in the structured JSON format defined by the output schema. Do not deviate from the schema.
    `,
});


const suggestCareerPathFlow = ai.defineFlow(
    {
        name: 'suggestCareerPathFlow',
        inputSchema: CareerPathInputSchema,
        outputSchema: CareerPathOutputSchema,
    },
    async (input) => {
        const { output } = await suggestCareerPathPrompt(input);
        return output!;
    }
);
