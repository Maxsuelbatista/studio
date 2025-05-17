
export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Giselle & Felipe. Todos os direitos reservados.</p>
        <p className="text-sm mt-2 opacity-80">
          Este é um site demonstrativo. As informações aqui contidas não constituem aconselhamento jurídico.
        </p>
      </div>
    </footer>
  );
}
