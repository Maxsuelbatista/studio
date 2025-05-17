
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity">
          <Image
            src="https://placehold.co/100x40.png" 
            alt="Giselle & Felipe Logo"
            width={100} 
            height={40}  
            data-ai-hint="logo brand"
            className="rounded"
          />
          <span>Giselle &amp; Felipe</span>
        </Link>
        <nav className="space-x-4">
          <Link href="#services" className="hover:text-accent transition-colors">Serviços</Link>
          <Link href="#testimonials" className="hover:text-accent transition-colors">Depoimentos</Link>
          <Link href="#contact" className="hover:text-accent transition-colors">Contato</Link>
        </nav>
      </div>
    </header>
  );
}
