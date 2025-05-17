"use client";

import { useState } from "react";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { assessCase, type CaseAssessmentInput, type CaseAssessmentOutput } from "@/ai/flows/case-assessor";
import { Loader2, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const caseAssessorSchema = z.object({
  jobTitle: z.string().min(2, { message: "Cargo deve ter pelo menos 2 caracteres." }),
  employmentDuration: z.string().min(2, { message: "Duração do emprego deve ser informada." }),
  reasonForLeaving: z.string().min(5, { message: "Motivo da saída deve ter pelo menos 5 caracteres." }),
  description: z.string().min(20, { message: "Descrição deve ter pelo menos 20 caracteres." }),
});

type CaseAssessorFormValues = z.infer<typeof caseAssessorSchema>;

export function CaseAssessorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<CaseAssessmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CaseAssessorFormValues>({
    resolver: zodResolver(caseAssessorSchema),
    defaultValues: {
      jobTitle: "",
      employmentDuration: "",
      reasonForLeaving: "",
      description: "",
    },
  });

  async function onSubmit(data: CaseAssessorFormValues) {
    setIsLoading(true);
    setAssessmentResult(null);
    setError(null);
    try {
      const result = await assessCase(data as CaseAssessmentInput);
      setAssessmentResult(result);
    } catch (err) {
      console.error("Case assessment error:", err);
      setError("Ocorreu um erro ao avaliar seu caso. Por favor, tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="assessor" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">Avalie Seu Caso com Nossa IA</CardTitle>
            <CardDescription>
              Receba uma análise preliminar sobre seu caso trabalhista. Preencha os detalhes abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Cargo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Analista de Sistemas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employmentDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de Emprego</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2 anos e 3 meses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reasonForLeaving"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo da Saída</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Demissão sem justa causa, Pedido de demissão" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição Detalhada dos Eventos</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva os acontecimentos relevantes para o seu caso..."
                          className="resize-none"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Avaliando...
                    </>
                  ) : (
                    "Obter Avaliação Preliminar"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          {(assessmentResult || error) && (
            <CardFooter className="flex flex-col items-start space-y-4 mt-6 pt-6 border-t">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Erro na Avaliação</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {assessmentResult && (
                <div className="w-full space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Resultado da Avaliação Preliminar:</h3>
                  
                  <Alert variant="default" className="bg-green-50 border-green-300">
                     <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <AlertTitle className="font-semibold text-green-700">Resumo do Caso</AlertTitle>
                    <AlertDescription className="text-green-700/90">{assessmentResult.summary}</AlertDescription>
                  </Alert>

                  <Alert variant="default" className="bg-blue-50 border-blue-300">
                    <Info className="h-5 w-5 text-blue-600" />
                    <AlertTitle className="font-semibold text-blue-700">Viabilidade Potencial</AlertTitle>
                    <AlertDescription className="text-blue-700/90">{assessmentResult.viability}</AlertDescription>
                  </Alert>

                  <Alert variant="default" className="bg-yellow-50 border-yellow-300">
                     <Info className="h-5 w-5 text-yellow-600" />
                    <AlertTitle className="font-semibold text-yellow-700">Próximos Passos Sugeridos</AlertTitle>
                    <AlertDescription className="text-yellow-700/90">{assessmentResult.nextSteps}</AlertDescription>
                  </Alert>
                  
                  <Alert variant="destructive" className="bg-red-50 border-red-300">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <AlertTitle className="font-semibold text-red-700">Importante</AlertTitle>
                    <AlertDescription className="text-red-700/90">{assessmentResult.disclaimer}</AlertDescription>
                  </Alert>
                </div>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
}
