
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity">
          {/* GF Monogram Logo */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-full"
          >
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" />
            <path
              d="M30 70V30H50V38H38V46H48V54H38V70H30ZM70 70V30H62V62H50V70H70Z"
              fill="currentColor"
            />
          </svg>
          <span>Giselle &amp; Felipe</span>
        </Link>
        <nav className="space-x-4">
          <Link href="#about-us" className="hover:text-accent transition-colors">Sobre Nós</Link> {/* Added About Us link */}
          <Link href="#services" className="hover:text-accent transition-colors">Serviços</Link>
          <Link href="#testimonials" className="hover:text-accent transition-colors">Depoimentos</Link>
          <Link href="#contact" className="hover:text-accent transition-colors">Contato</Link>
        </nav>
      </div>
    </header>
  );
}
