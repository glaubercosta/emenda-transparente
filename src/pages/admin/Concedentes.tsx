import { BackofficeLayout } from "@/components/layout/BackofficeLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Building2 } from "lucide-react";
import { useState } from "react";

const mockConcedentes = [
  {
    id: "1",
    nome: "Ministério da Saúde",
    cnpj: "00.394.544/0001-36",
    tipo: "Federal",
    ativo: true,
  },
  {
    id: "2",
    nome: "Ministério da Educação",
    cnpj: "00.394.445/0001-01",
    tipo: "Federal",
    ativo: true,
  },
  {
    id: "3",
    nome: "Secretaria de Estado de Saúde de MG",
    cnpj: "18.406.127/0001-43",
    tipo: "Estadual",
    ativo: true,
  },
  {
    id: "4",
    nome: "Fundo Nacional de Desenvolvimento da Educação",
    cnpj: "00.378.257/0001-81",
    tipo: "Federal",
    ativo: false,
  },
];

export default function Concedentes() {
  const [search, setSearch] = useState("");

  const filteredConcedentes = mockConcedentes.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.cnpj.includes(search)
  );

  return (
    <BackofficeLayout title="Concedentes" subtitle="Gerencie os órgãos concedentes">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Órgãos Concedentes
                </CardTitle>
                <CardDescription>
                  Cadastro de órgãos que concedem recursos via emendas parlamentares
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Concedente
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CNPJ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConcedentes.map((concedente) => (
                  <TableRow key={concedente.id}>
                    <TableCell className="font-medium">{concedente.nome}</TableCell>
                    <TableCell>{concedente.cnpj}</TableCell>
                    <TableCell>{concedente.tipo}</TableCell>
                    <TableCell>
                      <Badge variant={concedente.ativo ? "default" : "secondary"}>
                        {concedente.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </BackofficeLayout>
  );
}
