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
  interest: z.string().describe('The user\'s primary interest (e.g., building, problem-solving, creativity, healthcare).'),
  subject: z.string().describe('The user\'s favorite or strongest subject area (e.g., math, biology, arts, literature).'),
});
export type CareerPathInput = z.infer<typeof CareerPathInputSchema>;

const CareerPathOutputSchema = z.object({
    careerField: z.string().describe("The suggested career field, like 'Biomedical Engineering' or 'Digital Marketing'."),
    justification: z.string().describe("A concise (1-2 sentences) explanation of why this field is a good match based on the user's input."),
    inDemandSkills: z.array(z.string()).describe("A list of 3-5 specific, globally in-demand skills for this career."),
    topCompanies: z.array(z.string()).describe("A list of 3-5 globally recognized top companies known for hiring in this field."),
    careerPath: z.array(z.object({
        step: z.number().describe("The step number in the career path."),
        title: z.string().describe("The title of the career path step (e.g., 'Build Foundational Knowledge')."),
        description: z.string().describe("A brief, actionable description of the career path step for a student."),
    })).describe("A practical, 4-step guide for a student anywhere in the world to start a career in this field."),
});
export type CareerPathOutput = z.infer<typeof CareerPathOutputSchema>;


export async function suggestCareerPath(input: CareerPathInput): Promise<CareerPathOutput> {
    return suggestCareerPathFlow(input);
}


const suggestCareerPathPrompt = ai.definePrompt({
    name: 'suggestCareerPathPrompt',
    input: { schema: CareerPathInputSchema },
    output: { schema: CareerPathOutputSchema },
    prompt: `You are an expert career counselor AI for a global student audience. Based on the user's interest in '{{{interest}}}' and their strength in '{{{subject}}}', suggest a specific and relevant career field. The recommendation should be applicable worldwide.

    Provide the following details for the suggested career field:
    1.  **careerField**: A specific job title or field. Be creative and consider non-engineering fields if the input suggests it (e.g., if interest is 'creativity' and subject is 'literature', suggest 'Content Strategy' or 'Publishing').
    2.  **justification**: A concise (1-2 sentences) reason why this is a good fit for the user.
    3.  **inDemandSkills**: A list of 3-5 specific, globally in-demand skills for this career.
    4.  **topCompanies**: A list of 3-5 real-world, globally recognized companies known for hiring in this field.
    5.  **careerPath**: A practical, 4-step guide for a student to enter this field. Each step should have a title and a short, actionable description.

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
