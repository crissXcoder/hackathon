import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="w-full py-16 px-6 border-t border-border-hairline bg-surface-container-lowest">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1280px] mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300">
        
        {/* Brand & Copyright */}
        <div className="col-span-1 md:col-span-1 flex flex-col justify-between h-full space-y-6">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary block mb-2">
              Coopeguanacaste RL
            </Link>
            <p className="text-xs font-medium text-slate-muted">
              © 2024 Coopeguanacaste R.L. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Links Container */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
          <Link
            href="#"
            className="text-sm text-slate-muted hover:text-primary transition-all hover:translate-x-1 duration-300"
          >
            Regulación
          </Link>
          <Link
            href="#"
            className="text-sm text-slate-muted hover:text-primary transition-all hover:translate-x-1 duration-300"
          >
            Contacto
          </Link>
          <Link
            href="#"
            className="text-sm text-slate-muted hover:text-primary transition-all hover:translate-x-1 duration-300"
          >
            Aviso de Privacidad
          </Link>
          <Link
            href="#"
            className="text-sm text-slate-muted hover:text-primary transition-all hover:translate-x-1 duration-300"
          >
            Términos de Servicio
          </Link>
        </div>
      </div>
    </footer>
  );
}
