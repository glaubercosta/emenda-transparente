import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Users,
  Building2,
  ArrowRight,
  MoreVertical,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackofficeLayout } from "@/components/layout/BackofficeLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const metrics = [
  { 
    label: "Total de Emendas", 
    value: "1.247", 
    icon: FileText,
    change: "+12 este mês",
    color: "primary"
  },
  { 
    label: "Pendentes", 
    value: "89", 
    icon: AlertTriangle,
    change: "Requer atenção",
    color: "warning"
  },
  { 
    label: "Conformes", 
    value: "1.158", 
    icon: CheckCircle2,
    change: "92.8% do total",
    color: "success"
  },
  { 
    label: "Recebedores", 
    value: "547", 
    icon: Users,
    change: "Municípios atendidos",
    color: "info"
  },
];

const pendencias = [
  {
    id: "EMD-2024-0846",
    numero: "846/2024",
    motivo: "Sem evento de disponibilização",
    diasPendente: 15,
    concedente: "Bancada do Interior",
    municipio: "Uberlândia",
  },
  {
    id: "EMD-2024-0844",
    numero: "844/2024",
    motivo: "Valor disponibilizado divergente",
    diasPendente: 8,
    concedente: "Comissão de Saúde",
    municipio: "Montes Claros",
  },
  {
    id: "EMD-2024-0839",
    numero: "839/2024",
    motivo: "Sem evento de disponibilização",
    diasPendente: 22,
    concedente: "Dep. Ricardo Almeida",
    municipio: "Ouro Preto",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Emenda publicada",
    target: "EMD-2024-0847",
    user: "João Silva",
    time: "Há 2 horas",
  },
  {
    id: 2,
    action: "Evento adicionado",
    target: "EMD-2024-0845",
    user: "Maria Santos",
    time: "Há 4 horas",
  },
  {
    id: 3,
    action: "Emenda criada",
    target: "EMD-2024-0848",
    user: "João Silva",
    time: "Há 5 horas",
  },
  {
    id: 4,
    action: "Recebedor cadastrado",
    target: "Prefeitura de Contagem",
    user: "Carlos Ferreira",
    time: "Ontem",
  },
];

const getColorClass = (color: string) => {
  switch (color) {
    case 'success': return 'bg-success/10 text-success';
    case 'warning': return 'bg-warning/10 text-warning';
    case 'info': return 'bg-info/10 text-info';
    default: return 'bg-primary/10 text-primary';
  }
};

export default function AdminDashboard() {
  return (
    <BackofficeLayout title="Dashboard" subtitle="Visão geral do sistema">
      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-bold mt-1">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.change}
                  </p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClass(metric.color)}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pendências */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Pendências de Conformidade
              </CardTitle>
              <CardDescription>
                Emendas que requerem ação para publicação
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/emendas?status=pendente">
                Ver Todas
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendencias.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-medium">
                        {item.numero}
                      </span>
                      <Badge variant="warning">
                        {item.diasPendente} dias
                      </Badge>
                    </div>
                    <p className="text-sm text-destructive font-medium">
                      {item.motivo}
                    </p>
                    <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {item.concedente}
                      </span>
                      <span>{item.municipio}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/emendas/${item.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Corrigir Pendência
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimas alterações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span>
                      {" "}
                      <span className="text-muted-foreground">em</span>
                      {" "}
                      <span className="font-mono text-xs">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/admin/emendas/nova">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Nova Emenda</p>
                  <p className="text-sm text-muted-foreground">Cadastrar emenda</p>
                </div>
                <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/concedentes">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Concedentes</p>
                  <p className="text-sm text-muted-foreground">Gerenciar cadastros</p>
                </div>
                <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/recebedores">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success text-success-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Recebedores</p>
                  <p className="text-sm text-muted-foreground">Gerenciar cadastros</p>
                </div>
                <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </BackofficeLayout>
  );
}
