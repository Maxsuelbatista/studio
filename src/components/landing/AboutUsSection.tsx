
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle } from "lucide-react";

export function AboutUsSection() {
  return (
    <section id="about-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Equipe Giselle & Felipe Advocacia"
                width={600}
                height={400}
                className="object-cover h-full w-full"
                data-ai-hint="team collaboration"
              />
            </div>
            <div className="md:w-1/2">
              <CardHeader className="pb-4">
                <div className="flex items-center text-primary mb-2">
                  <Users className="h-8 w-8 mr-3" />
                  <CardTitle className="text-3xl sm:text-4xl font-bold">Sobre Nós</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-foreground/80 space-y-4">
                <p>
                  Nossa equipe é especializada em Direito Trabalhista, sempre com um olhar atento e dedicado a cada caso. 
                  Sabemos que cada situação é única, e é por isso que valorizamos o contato próximo e personalizado com você.
                </p>
                <p>
                  Queremos não apenas resolver suas demandas atuais, mas também construir uma relação de confiança para orientá-lo no futuro.
                </p>
                <p>
                  Aqui, você não é só mais um processo, é uma história que merece ser cuidada com atenção e respeito. 
                  <MessageCircle className="inline-block h-5 w-5 ml-1 mr-1 text-accent" />
                  Vamos conversar? Estamos à disposição para ajudar!
                </p>
                <p className="font-semibold text-primary pt-2">
                  Giselle & Felipe <br />Juntos pelos seus direitos.
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
