import { 
  FileText, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Search,
  Download,
  ArrowRight,
  Building2,
  Users,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicLayout } from "@/components/layout/PublicLayout";

// Mock data for metrics
const metrics = [
  { 
    label: "Total de Emendas", 
    value: "1.247", 
    change: "+12%",
    icon: FileText,
    description: "Exercício 2024"
  },
  { 
    label: "Valor Disponibilizado", 
    value: "R$ 892 mi", 
    change: "+8%",
    icon: TrendingUp,
    description: "Total acumulado"
  },
  { 
    label: "Municípios Atendidos", 
    value: "547", 
    change: "+5%",
    icon: MapPin,
    description: "De 853 municípios"
  },
  { 
    label: "Concedentes Ativos", 
    value: "312", 
    change: "+15%",
    icon: Building2,
    description: "Parlamentares e bancadas"
  },
];

const quickLinks = [
  {
    title: "Consultar Emendas",
    description: "Pesquise por município, concedente, valor ou objeto",
    icon: Search,
    href: "/consulta",
    variant: "primary" as const
  },
  {
    title: "Exportar Dados",
    description: "Baixe planilhas completas em CSV ou JSON",
    icon: Download,
    href: "/consulta?export=true",
    variant: "secondary" as const
  },
  {
    title: "Metodologia",
    description: "Entenda os critérios e definições utilizados",
    icon: BarChart3,
    href: "/metodologia",
    variant: "secondary" as const
  },
];

const recentAmendments = [
  {
    id: "EMD-2024-0847",
    concedente: "Dep. Maria Santos",
    municipio: "Belo Horizonte",
    valor: "R$ 1.500.000,00",
    objeto: "Construção de Unidade Básica de Saúde",
    status: "ok"
  },
  {
    id: "EMD-2024-0846",
    concedente: "Bancada do Interior",
    municipio: "Uberlândia",
    valor: "R$ 890.000,00",
    objeto: "Aquisição de equipamentos hospitalares",
    status: "pendente"
  },
  {
    id: "EMD-2024-0845",
    concedente: "Dep. João Oliveira",
    municipio: "Juiz de Fora",
    valor: "R$ 2.100.000,00",
    objeto: "Pavimentação de vias urbanas",
    status: "ok"
  },
  {
    id: "EMD-2024-0844",
    concedente: "Comissão de Saúde",
    municipio: "Montes Claros",
    valor: "R$ 750.000,00",
    objeto: "Reforma de Centro de Saúde",
    status: "pendente"
  },
];

export default function PublicHome() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="header-portal py-16 md:py-24">
        <div className="container-portal">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-0">
              Recomendação MPC-MG nº 01/2025
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Portal de Transparência de Emendas Parlamentares
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Consulte, acompanhe e fiscalize a destinação de recursos públicos 
              através de emendas parlamentares em Minas Gerais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/consulta">
                  <Search className="h-5 w-5" />
                  Consultar Emendas
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/metodologia">
                  Saiba Mais
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 -mt-8">
        <div className="container-portal">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="card-metric animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {metric.label}
                      </p>
                      <p className="card-metric-value">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {metric.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <metric.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="success" className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-muted/30">
        <div className="container-portal">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Acesso Rápido</h2>
            <p className="text-muted-foreground">
              Encontre as informações que você precisa
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.href}>
                <Card className={`h-full transition-all hover:shadow-lg hover:-translate-y-1 ${link.variant === 'primary' ? 'bg-primary text-primary-foreground' : ''}`}>
                  <CardHeader>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${link.variant === 'primary' ? 'bg-primary-foreground/20' : 'bg-primary/10'}`}>
                      <link.icon className={`h-6 w-6 ${link.variant === 'primary' ? '' : 'text-primary'}`} />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {link.title}
                      <ArrowRight className="h-4 w-4 opacity-60" />
                    </CardTitle>
                    <CardDescription className={link.variant === 'primary' ? 'text-primary-foreground/80' : ''}>
                      {link.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Amendments Section */}
      <section className="py-12">
        <div className="container-portal">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Últimas Emendas</h2>
              <p className="text-muted-foreground">
                Acompanhe as atualizações mais recentes
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/consulta">
                Ver Todas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {recentAmendments.map((emenda, index) => (
              <Card key={index} className="data-row">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">
                          {emenda.id}
                        </span>
                        <Badge variant={emenda.status === 'ok' ? 'success' : 'warning'}>
                          {emenda.status === 'ok' ? 'Conforme' : 'Pendente'}
                        </Badge>
                      </div>
                      <h3 className="font-semibold truncate">{emenda.objeto}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {emenda.concedente}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {emenda.municipio}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Valor</p>
                        <p className="font-semibold text-lg">{emenda.valor}</p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/consulta/${emenda.id}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-portal text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Contribua com a Fiscalização
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            A transparência fortalece a democracia. Utilize os dados disponíveis 
            para acompanhar a aplicação dos recursos públicos em seu município.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/consulta">
                <Search className="h-5 w-5" />
                Iniciar Consulta
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/sobre">
                Sobre o Portal
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
