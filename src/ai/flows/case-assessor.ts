// 'use server'
'use server';

/**
 * @fileOverview AI-powered tool to provide preliminary assessment of potential labor law cases based on user input.
 *
 * - assessCase - A function that handles the case assessment process.
 * - CaseAssessmentInput - The input type for the assessCase function.
 * - CaseAssessmentOutput - The return type for the assessCase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CaseAssessmentInputSchema = z.object({
  jobTitle: z.string().describe('Your job title.'),
  employmentDuration: z.string().describe('How long you were employed.'),
  reasonForLeaving: z.string().describe('The reason for leaving your job.'),
  description: z.string().describe('A detailed description of the events leading to the potential labor law case.'),
});
export type CaseAssessmentInput = z.infer<typeof CaseAssessmentInputSchema>;

const CaseAssessmentOutputSchema = z.object({
  summary: z.string().describe('A summary of the case assessment.'),
  viability: z.string().describe('A preliminary assessment of the case viability, indicating potential legal grounds.'),
  nextSteps: z.string().describe('Recommended next steps, such as consulting with a lawyer.'),
  disclaimer: z.string().describe('A disclaimer stating that this is not legal advice and is for informational purposes only.'),
});
export type CaseAssessmentOutput = z.infer<typeof CaseAssessmentOutputSchema>;

export async function assessCase(input: CaseAssessmentInput): Promise<CaseAssessmentOutput> {
  return assessCaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'caseAssessmentPrompt',
  input: {schema: CaseAssessmentInputSchema},
  output: {schema: CaseAssessmentOutputSchema},
  prompt: `You are an AI assistant providing preliminary assessments for potential labor law cases.

  Based on the details provided, assess the viability of the case and suggest next steps.
  Remember to include a disclaimer that this is not legal advice.

  Job Title: {{{jobTitle}}}
  Employment Duration: {{{employmentDuration}}}
  Reason for Leaving: {{{reasonForLeaving}}}
  Description: {{{description}}}

  Respond with a summary, viability assessment, suggested next steps, and a disclaimer.
  Here's the format of the output, the description for each field must be used when generating the content:
  Summary: <A summary of the case assessment.>
  Viability: <A preliminary assessment of the case viability, indicating potential legal grounds.>
  Next Steps: <Recommended next steps, such as consulting with a lawyer.>
  Disclaimer: <A disclaimer stating that this is not legal advice and is for informational purposes only.>
  `,
});

const assessCaseFlow = ai.defineFlow(
  {
    name: 'assessCaseFlow',
    inputSchema: CaseAssessmentInputSchema,
    outputSchema: CaseAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
