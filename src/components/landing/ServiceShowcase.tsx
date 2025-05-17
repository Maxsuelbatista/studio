import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, ShieldAlert, Activity, Briefcase } from "lucide-react"; // Added Briefcase
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

const services: Service[] = [
  {
    icon: FileText,
    title: "Rescisão Contratual",
    description: "Análise e orientação em casos de demissão, justa causa, acordos e verbas rescisórias.",
    link: "#contact",
  },
  {
    icon: Clock,
    title: "Horas Extras e Adicionais",
    description: "Reivindicação de horas extras não pagas, adicionais noturnos, de periculosidade e insalubridade.",
    link: "#contact",
  },
  {
    icon: ShieldAlert,
    title: "Assédio Moral e Sexual",
    description: "Defesa em casos de assédio no ambiente de trabalho, buscando reparação e justiça.",
    link: "#contact",
  },
  {
    icon: Activity, // Replaced BriefcaseMedical as it is not in lucide-react
    title: "Acidentes e Doenças Ocupacionais",
    description: "Suporte em casos de acidentes de trabalho e doenças relacionadas à atividade profissional.",
    link: "#contact",
  },
  {
    icon: Briefcase, 
    title: "Direitos Trabalhistas Gerais",
    description: "Consultoria sobre férias, 13º salário, FGTS, e outras questões do direito do trabalho.",
    link: "#contact",
  },
];

export function ServiceShowcase() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">
          Nossas Áreas de Atuação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                <service.icon className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl font-semibold text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center text-foreground/80">{service.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0 text-center">
                <Button variant="link" className="text-accent font-semibold" asChild>
                  <Link href={service.link}>Saiba Mais</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
