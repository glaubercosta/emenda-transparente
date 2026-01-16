import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Search, Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Consultar Emendas", href: "/consulta" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Sobre", href: "/sobre" },
];

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="header-portal sticky top-0 z-50">
        <div className="container-portal">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                <FileText className="h-5 w-5" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg leading-tight">Portal de Emendas</div>
                <div className="text-xs opacity-80">MPC-MG</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary-foreground/15"
                      : "hover:bg-primary-foreground/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="hero-outline" 
                size="sm"
                className="hidden sm:inline-flex"
                asChild
              >
                <Link to="/admin">
                  Área Restrita
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary-foreground/20">
            <nav className="container-portal py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary-foreground/15"
                      : "hover:bg-primary-foreground/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-primary-foreground/10"
              >
                Área Restrita
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container-portal py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Portal de Emendas</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema de transparência e consulta pública de emendas conforme 
                Recomendação MPC-MG nº 01/2025.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/consulta" className="text-muted-foreground hover:text-foreground transition-colors">
                    Consultar Emendas
                  </Link>
                </li>
                <li>
                  <Link to="/metodologia" className="text-muted-foreground hover:text-foreground transition-colors">
                    Metodologia
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://www.mpc.mg.gov.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Site MPC-MG
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Ministério Público de Contas de Minas Gerais</li>
                <li>Av. Raja Gabaglia, 1315 - Luxemburgo</li>
                <li>Belo Horizonte - MG | CEP: 30380-435</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MPC-MG. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
