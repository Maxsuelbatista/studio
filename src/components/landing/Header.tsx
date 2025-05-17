import Link from 'next/link';

// SVG Logo for "GF" Monogram
const SvgLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="currentColor" // Inherits color from parent text
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Outer Circle */}
      <circle cx="50" cy="50" r="44" strokeWidth="4"/>
      
      {/* Stylized "G" */}
      <path strokeWidth="5.5" d="M72 30 
                           C 72 18, 62 12, 50 15 
                           C 35 19, 25 33, 25 50 
                           C 25 67, 35 81, 50 85 
                           C 65 81, 75 68, 73 53"/>
      
      {/* Stylized "F" (crossbar and shared stem) */}
      {/* The right part of G (from C 73 53) acts as F's stem */}
      <path strokeWidth="5.5" d="M40 51 L73 51"/>
      
      {/* Optional: Small serif/tail for the F at the bottom of its stem */}
      <path strokeWidth="5.5" d="M73 53 Q 73 65 68 70"/>
    </g>
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
