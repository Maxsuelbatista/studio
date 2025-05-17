
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageSquare, Phone, User, Smartphone } from "lucide-react";
import { sendContactFormData, type ContactFormInput } from '@/ai/flows/contact-form-flow';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

async function processContactFormWithAI(data: ContactFormValues) {
  try {
    const contactData: ContactFormInput = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    if (data.phone) {
      contactData.phone = data.phone;
    }

    const emailDetails = await sendContactFormData(contactData);
    console.log("AI Prepared Email Content:", emailDetails);

    // SIMULATION: In a real application, you would now send this email.
    // Example:
    // await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: emailDetails.recipientEmail,
    //     subject: emailDetails.emailSubject,
    //     html: emailDetails.emailBody.replace(/\n/g, '<br>')
    //   }),
    // });
    // For now, we just simulate a delay.
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: "Dados do formulário preparados para envio!" };
  } catch (error) {
    console.error("Error processing contact form with AI:", error);
    // It's important to inform the user about the error.
    // The error might originate from the AI flow or other parts of the processing.
    throw new Error("Falha ao processar os dados do formulário com IA.");
  }
}


export function ContactFormSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      await processContactFormWithAI(data);
      toast({
        title: "Sucesso!",
        description: "Sua mensagem foi preparada para envio. Entraremos em contato em breve.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um problema ao processar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">Entre em Contato</CardTitle>
            <CardDescription>
              Tem alguma dúvida ou precisa de assessoria? Preencha o formulário abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4 text-primary" />Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
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
                      <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary" />Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary" />Telefone (Opcional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(XX) XXXXX-XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><MessageSquare className="mr-2 h-4 w-4 text-primary" />Sua Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva sua situação ou dúvida..."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Form>
            <div className="mt-8 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Ou, se preferir, fale conosco diretamente:</p>
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto" 
                asChild
              >
                <a
                  href={`https://wa.me/5511989407822?text=${encodeURIComponent("Olá! Visitei o site Giselle & Felipe Advocacia e gostaria de mais informações.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contato via WhatsApp"
                >
                  <Smartphone className="mr-2 h-5 w-5" /> 
                  Conversar pelo WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
