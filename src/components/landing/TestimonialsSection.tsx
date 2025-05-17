
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatarUrl?: string;
  avatarFallback: string;
  quote: string;
  rating: number;
  imageHint: string;
}

const testimonials: Testimonial[] = [
  {
    name: "João Silva",
    role: "Ex-Funcionário de TI",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "JS",
    quote: "Giselle & Felipe Advocacia foi fundamental para garantir meus direitos na rescisão. Profissionalismo impecável!",
    rating: 5,
    imageHint: "man portrait"
  },
  {
    name: "Maria Oliveira",
    role: "Gerente Comercial",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "MO",
    quote: "Consegui reaver horas extras não pagas graças à equipe competente da Giselle & Felipe Advocacia. Recomendo fortemente.",
    rating: 5,
    imageHint: "woman professional"
  },
  {
    name: "Carlos Pereira",
    role: "Operador de Máquinas",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "CP",
    quote: "Após um acidente de trabalho, tive todo o suporte necessário. Equipe atenciosa e eficiente.",
    rating: 4,
    imageHint: "man smiling"
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">
          O Que Nossos Clientes Dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
              <CardHeader className="items-center pt-6">
                 <Quote className="h-10 w-10 text-accent mb-4" />
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-foreground/80 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center pt-0 pb-6">
                <Avatar className="mb-2 h-16 w-16">
                  {testimonial.avatarUrl && <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />}
                  <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
