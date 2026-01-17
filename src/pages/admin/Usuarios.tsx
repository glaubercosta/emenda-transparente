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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, UserCog } from "lucide-react";
import { useState } from "react";

const mockUsuarios = [
  {
    id: "1",
    nome: "Admin Sistema",
    email: "admin@mpcmg.mp.br",
    perfil: "Administrador",
    ativo: true,
    ultimoAcesso: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    nome: "Maria Silva",
    email: "maria.silva@mpcmg.mp.br",
    perfil: "Operador",
    ativo: true,
    ultimoAcesso: "2024-01-14T15:45:00",
  },
  {
    id: "3",
    nome: "João Santos",
    email: "joao.santos@mpcmg.mp.br",
    perfil: "Consultor",
    ativo: true,
    ultimoAcesso: "2024-01-13T09:20:00",
  },
  {
    id: "4",
    nome: "Ana Costa",
    email: "ana.costa@mpcmg.mp.br",
    perfil: "Operador",
    ativo: false,
    ultimoAcesso: "2023-12-20T14:00:00",
  },
];

const perfilColors: Record<string, string> = {
  Administrador: "bg-primary text-primary-foreground",
  Operador: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Consultor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Usuarios() {
  const [search, setSearch] = useState("");

  const filteredUsuarios = mockUsuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BackofficeLayout title="Usuários" subtitle="Gerencie os usuários do sistema">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  Usuários do Sistema
                </CardTitle>
                <CardDescription>
                  Controle de acesso e permissões de usuários
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(usuario.nome)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{usuario.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <Badge className={perfilColors[usuario.perfil] || ""}>
                        {usuario.perfil}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(usuario.ultimoAcesso)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={usuario.ativo ? "default" : "secondary"}>
                        {usuario.ativo ? "Ativo" : "Inativo"}
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
