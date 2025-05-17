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
import { Mail, MessageSquare, Phone, User } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

async function submitContactForm(data: ContactFormValues) {
  // Simulate API call
  console.log("Contact form submitted:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you would send this data to your backend or a service like Formspree.
  // For example:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error("Failed to submit form.");
  return { success: true, message: "Mensagem enviada com sucesso!" };
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
      // Here you would typically send the data to a server
      // For this example, we'll just log it and show a toast
      await submitContactForm(data);
      toast({
        title: "Sucesso!",
        description: "Sua mensagem foi enviada. Entraremos em contato em breve.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um problema ao enviar sua mensagem. Tente novamente.",
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
