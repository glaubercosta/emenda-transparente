import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown,
  MapPin,
  Building2,
  Calendar,
  ArrowUpDown,
  Eye,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data
const emendas = [
  {
    id: "EMD-2024-0847",
    numero: "847/2024",
    concedente: { tipo: "Parlamentar", nome: "Dep. Maria Santos" },
    recebedor: { nome: "Prefeitura de Belo Horizonte", municipio: "Belo Horizonte", uf: "MG" },
    objeto: "Construção de Unidade Básica de Saúde no Bairro Venda Nova",
    gnd: "GND4",
    valorIndicado: 1500000,
    valorDisponibilizado: 1500000,
    status: "ok",
    exercicio: 2024
  },
  {
    id: "EMD-2024-0846",
    numero: "846/2024",
    concedente: { tipo: "Bancada", nome: "Bancada do Interior" },
    recebedor: { nome: "Prefeitura de Uberlândia", municipio: "Uberlândia", uf: "MG" },
    objeto: "Aquisição de equipamentos hospitalares para o Hospital Municipal",
    gnd: "GND4",
    valorIndicado: 890000,
    valorDisponibilizado: 0,
    status: "pendente",
    exercicio: 2024
  },
  {
    id: "EMD-2024-0845",
    numero: "845/2024",
    concedente: { tipo: "Parlamentar", nome: "Dep. João Oliveira" },
    recebedor: { nome: "Prefeitura de Juiz de Fora", municipio: "Juiz de Fora", uf: "MG" },
    objeto: "Pavimentação de vias urbanas no centro histórico",
    gnd: "GND4",
    valorIndicado: 2100000,
    valorDisponibilizado: 2100000,
    status: "ok",
    exercicio: 2024
  },
  {
    id: "EMD-2024-0844",
    numero: "844/2024",
    concedente: { tipo: "Comissão", nome: "Comissão de Saúde" },
    recebedor: { nome: "Prefeitura de Montes Claros", municipio: "Montes Claros", uf: "MG" },
    objeto: "Reforma de Centro de Saúde Municipal",
    gnd: "GND3",
    valorIndicado: 750000,
    valorDisponibilizado: 500000,
    status: "pendente",
    exercicio: 2024
  },
  {
    id: "EMD-2024-0843",
    numero: "843/2024",
    concedente: { tipo: "Parlamentar", nome: "Dep. Ana Paula" },
    recebedor: { nome: "Prefeitura de Governador Valadares", municipio: "Gov. Valadares", uf: "MG" },
    objeto: "Construção de creche municipal no Bairro São Paulo",
    gnd: "GND4",
    valorIndicado: 1200000,
    valorDisponibilizado: 1200000,
    status: "ok",
    exercicio: 2024
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export default function ConsultaEmendas() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <PublicLayout>
      <div className="container-portal py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Consulta de Emendas</h1>
          <p className="text-muted-foreground">
            Pesquise e visualize informações detalhadas sobre emendas parlamentares
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por número, objeto, concedente ou município..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filtros
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                      Exportar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Exportar CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Exportar JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Collapsible open={showFilters}>
              <CollapsibleContent className="mt-4 pt-4 border-t">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exercício</label>
                    <Select defaultValue="2024">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo Concedente</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="parlamentar">Parlamentar</SelectItem>
                        <SelectItem value="bancada">Bancada</SelectItem>
                        <SelectItem value="comissao">Comissão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">GND</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="gnd3">GND3 - Custeio</SelectItem>
                        <SelectItem value="gnd4">GND4 - Investimento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="ok">Conforme</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="ghost">Limpar Filtros</Button>
                  <Button>Aplicar Filtros</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Exibindo <strong>{emendas.length}</strong> de <strong>1.247</strong> emendas
          </p>
          <Button variant="ghost" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Ordenar por valor
          </Button>
        </div>

        {/* Results Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Número</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Concedente</TableHead>
                  <TableHead>Município</TableHead>
                  <TableHead className="text-right">Valor Indicado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emendas.map((emenda) => (
                  <TableRow key={emenda.id} className="data-row">
                    <TableCell className="font-mono text-sm">
                      {emenda.numero}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px]">
                        <p className="font-medium truncate">{emenda.objeto}</p>
                        <Badge variant="muted" className="mt-1 text-xs">
                          {emenda.gnd}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{emenda.concedente.nome}</p>
                          <p className="text-xs text-muted-foreground">{emenda.concedente.tipo}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {emenda.recebedor.municipio}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(emenda.valorIndicado)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={emenda.status === 'ok' ? 'success' : 'warning'}>
                        {emenda.status === 'ok' ? 'Conforme' : 'Pendente'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/consulta/${emenda.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Página 1 de 125
          </p>
          <div className="flex gap-2">
            <Button variant="outline" disabled>Anterior</Button>
            <Button variant="outline">Próxima</Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
