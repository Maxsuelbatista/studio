import Link from 'next/link';

// SVG Logo for "S&F"
const SvgLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="currentColor" // Inherits color from parent
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M63.5 25C52.5 25 45 33 45 43.5C45 54.5 53 60 63 60C68.5 60 73 57.5 75.5 54M63.5 25C77 25 83.5 37 83.5 47.5C83.5 57.5 77 69 63.5 69M45 43.5C35 43.5 25 37.5 25 25C25 12.5 35 5 47.5 5C60 5 67.5 15 67.5 27.5M70 55C70 62.5 65 70 57.5 70C50 70 45 65 45 57.5C45 50 50 45 57.5 45C60.1667 45 62.6389 45.5556 65 47M40 57.5C40 70 35 80 25 80C15 80 10 70 10 57.5C10 45 15 35 25 35C35 35 40 45 40 57.5M57.5 70C57.5 80 52.5 90 45 95M57.5 70C60 70 65 70 65 70"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);


export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity">
          <SvgLogo />
          <span>Felipe &amp; Silva</span>
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
