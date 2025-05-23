
'use server';
/**
 * @fileOverview Flow to prepare contact form data for email submission.
 *
 * - sendContactFormData - Prepares email content from contact form data.
 * - ContactFormInput - The input type for the flow.
 * - ContactFormOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RECIPIENT_EMAIL = "gisellefelipe.adv@gmail.com";

const ContactFormInputSchema = z.object({
  name: z.string().describe("Nome do remetente"),
  email: z.string().email().describe("Email do remetente"),
  phone: z.string().optional().describe("Telefone do remetente (opcional)"),
  message: z.string().describe("A mensagem de contato"),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  recipientEmail: z.string().email().describe("Email do destinatário."),
  emailSubject: z.string().describe("Assunto do email."),
  emailBody: z.string().describe("Corpo do email formatado."),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function sendContactFormData(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFormEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactFormEmailPrompt',
  input: { schema: ContactFormInputSchema },
  // The LLM is responsible for generating the subject and body.
  // The recipientEmail is added by the flow logic.
  output: { schema: ContactFormOutputSchema.omit({ recipientEmail: true }) },
  prompt: `Você é um assistente encarregado de preparar o conteúdo de um e-mail a partir de um envio de formulário de contato.
O e-mail será enviado para ${RECIPIENT_EMAIL}.
O assunto do e-mail deve ser "Novo Contato do Site - {{name}}".
O corpo do e-mail deve apresentar claramente todas as informações enviadas:

Nome: {{name}}
Email: {{email}}
{{#if phone}}
Telefone: {{phone}}
{{/if}}
Mensagem:
{{{message}}}

Por favor, gere o assunto e o corpo para este e-mail. O destinatário já está definido como ${RECIPIENT_EMAIL}.`,
});

const contactFormEmailFlow = ai.defineFlow(
  {
    name: 'contactFormEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate email content.");
    }
    return {
        ...output, // Contains emailSubject and emailBody generated by the LLM
        recipientEmail: RECIPIENT_EMAIL,
    };
  }
);
