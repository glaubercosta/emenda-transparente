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
import { Search, Plus, Users } from "lucide-react";
import { useState } from "react";

const mockRecebedores = [
  {
    id: "1",
    nome: "Prefeitura Municipal de Belo Horizonte",
    cnpj: "18.715.383/0001-40",
    municipio: "Belo Horizonte",
    uf: "MG",
    ativo: true,
  },
  {
    id: "2",
    nome: "Prefeitura Municipal de Uberlândia",
    cnpj: "18.431.312/0001-04",
    municipio: "Uberlândia",
    uf: "MG",
    ativo: true,
  },
  {
    id: "3",
    nome: "Prefeitura Municipal de Contagem",
    cnpj: "18.715.508/0001-31",
    municipio: "Contagem",
    uf: "MG",
    ativo: true,
  },
  {
    id: "4",
    nome: "Prefeitura Municipal de Juiz de Fora",
    cnpj: "18.338.178/0001-02",
    municipio: "Juiz de Fora",
    uf: "MG",
    ativo: false,
  },
];

export default function Recebedores() {
  const [search, setSearch] = useState("");

  const filteredRecebedores = mockRecebedores.filter(
    (r) =>
      r.nome.toLowerCase().includes(search.toLowerCase()) ||
      r.cnpj.includes(search) ||
      r.municipio.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BackofficeLayout title="Recebedores" subtitle="Gerencie os órgãos recebedores">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Órgãos Recebedores
                </CardTitle>
                <CardDescription>
                  Cadastro de prefeituras e entidades que recebem recursos de emendas
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Recebedor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CNPJ ou município..."
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
                  <TableHead>Município</TableHead>
                  <TableHead>UF</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecebedores.map((recebedor) => (
                  <TableRow key={recebedor.id}>
                    <TableCell className="font-medium">{recebedor.nome}</TableCell>
                    <TableCell>{recebedor.cnpj}</TableCell>
                    <TableCell>{recebedor.municipio}</TableCell>
                    <TableCell>{recebedor.uf}</TableCell>
                    <TableCell>
                      <Badge variant={recebedor.ativo ? "default" : "secondary"}>
                        {recebedor.ativo ? "Ativo" : "Inativo"}
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
