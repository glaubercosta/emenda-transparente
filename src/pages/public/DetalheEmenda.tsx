import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Calendar,
  User,
  Landmark,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Printer,
  Share2
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PublicLayout } from "@/components/layout/PublicLayout";

// Mock data for detail
const emendaDetail = {
  id: "EMD-2024-0847",
  numero: "847/2024",
  exercicio: 2024,
  modalidade: "Transferência Especial",
  status: "publicada",
  conformidade: "ok",
  concedente: {
    tipo: "Parlamentar",
    nome: "Dep. Maria Santos",
  },
  recebedor: {
    tipo: "Prefeitura Municipal",
    nome: "Prefeitura Municipal de Belo Horizonte",
    cnpj: "18.715.383/0001-40",
    municipio: "Belo Horizonte",
    uf: "MG",
    codigoIbge: "3106200",
  },
  objeto: {
    tipo: "Saúde",
    descricao: "Construção de Unidade Básica de Saúde no Bairro Venda Nova, com capacidade para atendimento de 15.000 habitantes, contemplando consultórios médicos, sala de vacinação, farmácia básica e área administrativa.",
    gnd: "GND4",
  },
  valores: {
    indicado: 1500000,
    disponibilizado: 1500000,
  },
  gestor: {
    nome: "Dr. Carlos Alberto de Souza",
  },
  anuenciaSus: true,
  contaBancaria: {
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "*****.***-X",
  },
  eventos: [
    {
      id: 1,
      tipo: "CADASTRO",
      data: "2024-02-15",
      descricao: "Emenda cadastrada no sistema",
    },
    {
      id: 2,
      tipo: "DISPONIBILIZAÇÃO",
      data: "2024-03-20",
      valor: 750000,
      descricao: "Primeira parcela liberada",
    },
    {
      id: 3,
      tipo: "DISPONIBILIZAÇÃO",
      data: "2024-05-10",
      valor: 750000,
      descricao: "Segunda parcela liberada",
    },
    {
      id: 4,
      tipo: "PUBLICAÇÃO",
      data: "2024-05-15",
      descricao: "Emenda publicada no portal de transparência",
    },
  ],
  atualizadoEm: "2024-05-15T14:30:00",
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR');
};

export default function DetalheEmenda() {
  const { id } = useParams();

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'DISPONIBILIZAÇÃO':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'PUBLICAÇÃO':
        return <FileText className="h-4 w-4 text-info" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <PublicLayout>
      <div className="container-portal py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/consulta" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar para consulta
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                Emenda {emendaDetail.numero}
              </h1>
              <Badge variant={emendaDetail.conformidade === 'ok' ? 'success' : 'warning'}>
                {emendaDetail.conformidade === 'ok' ? 'Conforme' : 'Pendente'}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Exercício {emendaDetail.exercicio} • {emendaDetail.modalidade}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Indicado</p>
                  <p className="text-2xl font-bold">{formatCurrency(emendaDetail.valores.indicado)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Disponibilizado</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(emendaDetail.valores.disponibilizado)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Última Atualização</p>
                  <p className="text-lg font-semibold">{formatDate(emendaDetail.atualizadoEm)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="detalhes" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="eventos">Eventos Financeiros</TabsTrigger>
            <TabsTrigger value="conformidade">Conformidade</TabsTrigger>
          </TabsList>

          <TabsContent value="detalhes" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Concedente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 className="h-5 w-5" />
                    Concedente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-medium">{emendaDetail.concedente.tipo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{emendaDetail.concedente.nome}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recebedor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5" />
                    Recebedor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{emendaDetail.recebedor.nome}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">CNPJ</p>
                      <p className="font-mono text-sm">{emendaDetail.recebedor.cnpj}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Código IBGE</p>
                      <p className="font-mono text-sm">{emendaDetail.recebedor.codigoIbge}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Localização</p>
                    <p className="font-medium">{emendaDetail.recebedor.municipio} - {emendaDetail.recebedor.uf}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Objeto */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Objeto e Classificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge>{emendaDetail.objeto.tipo}</Badge>
                    <Badge variant="outline">{emendaDetail.objeto.gnd}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Descrição</p>
                    <p className="text-foreground leading-relaxed">{emendaDetail.objeto.descricao}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Gestor Responsável</p>
                      <p className="font-medium flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {emendaDetail.gestor.nome}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Anuência SUS</p>
                      <Badge variant={emendaDetail.anuenciaSus ? 'success' : 'warning'}>
                        {emendaDetail.anuenciaSus ? 'Sim' : 'Não'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conta Bancária */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Landmark className="h-5 w-5" />
                    Conta Bancária
                  </CardTitle>
                  <CardDescription>
                    Dados parcialmente ocultados conforme política de privacidade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Banco</p>
                      <p className="font-medium">{emendaDetail.contaBancaria.banco}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Agência</p>
                      <p className="font-mono">{emendaDetail.contaBancaria.agencia}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conta</p>
                      <p className="font-mono">{emendaDetail.contaBancaria.conta}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="eventos">
            <Card>
              <CardHeader>
                <CardTitle>Linha do Tempo</CardTitle>
                <CardDescription>
                  Histórico de eventos financeiros e administrativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {emendaDetail.eventos.map((evento, index) => (
                    <div key={evento.id} className="timeline-item">
                      <div className="timeline-dot">
                        {getEventIcon(evento.tipo)}
                      </div>
                      <div className="ml-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={evento.tipo === 'DISPONIBILIZAÇÃO' ? 'success' : 'muted'}>
                            {evento.tipo}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(evento.data)}
                          </span>
                        </div>
                        <p className="text-sm">{evento.descricao}</p>
                        {evento.valor && (
                          <p className="text-lg font-semibold text-success mt-1">
                            {formatCurrency(evento.valor)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conformidade">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Análise de Conformidade
                </CardTitle>
                <CardDescription>
                  Verificação de requisitos conforme Recomendação MPC-MG nº 01/2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Evento de Disponibilização</p>
                        <p className="text-sm text-muted-foreground">Ao menos um evento registrado</p>
                      </div>
                    </div>
                    <Badge variant="success">Conforme</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Dados do Recebedor</p>
                        <p className="text-sm text-muted-foreground">CNPJ, município e código IBGE preenchidos</p>
                      </div>
                    </div>
                    <Badge variant="success">Conforme</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Objeto e GND</p>
                        <p className="text-sm text-muted-foreground">Descrição do objeto e classificação definidos</p>
                      </div>
                    </div>
                    <Badge variant="success">Conforme</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Valor Disponibilizado</p>
                        <p className="text-sm text-muted-foreground">Soma dos eventos corresponde ao valor indicado</p>
                      </div>
                    </div>
                    <Badge variant="success">Conforme</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PublicLayout>
  );
}
