import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-accent text-primary-foreground py-20 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <Image 
          src="https://placehold.co/1920x1080.png" 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          data-ai-hint="legal abstract pattern" 
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-md">
          Defendendo Seus Direitos Trabalhistas com Expertise e Dedicação
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-sm">
          Assessoria jurídica especializada para garantir justiça e equidade no ambiente de trabalho.
        </p>
        <div className="space-x-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="#assessor">Avalie Seu Caso Gratuitamente</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <Link href="#contact">Fale com um Especialista</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
