import { useState } from "react";
import { Link } from "react-router-dom";
import { BackofficeLayout } from "@/components/layout/BackofficeLayout";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Trash2,
  Download,
  Filter,
} from "lucide-react";
import { useEmendasList, useDeleteEmenda, useDuplicateEmenda, useExportEmendas } from "@/hooks/useEmendas";
import { formatCurrency } from "@/lib/masks";
import { exerciciosDisponiveis } from "@/defaults/emenda";
import { useToast } from "@/hooks/use-toast";
import type { StatusEmenda } from "@/types/emenda";

const statusColors: Record<string, string> = {
  rascunho: "bg-muted text-muted-foreground",
  publicavel: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  publicada: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const statusLabels: Record<string, string> = {
  rascunho: "Rascunho",
  publicavel: "Publicável",
  publicada: "Publicada",
};

export default function ListaEmendas() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [exercicio, setExercicio] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const { data, isLoading } = useEmendasList(
    {
      search: search || undefined,
      exercicio: exercicio !== "all" ? Number(exercicio) : undefined,
      status: status !== "all" ? status as StatusEmenda : undefined,
    },
    { page, pageSize: 10 }
  );
  
  const deleteMutation = useDeleteEmenda();
  const duplicateMutation = useDuplicateEmenda();
  const exportMutation = useExportEmendas();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMutation.mutateAsync(deleteId);
      toast({ title: "Emenda excluída com sucesso" });
      setDeleteId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    await duplicateMutation.mutateAsync(id);
    toast({ title: "Emenda duplicada com sucesso" });
  };

  const handleExport = async (format: "csv" | "json") => {
    await exportMutation.mutateAsync({
      filters: { 
        search: search || undefined, 
        exercicio: exercicio !== "all" ? Number(exercicio) : undefined 
      },
      format,
    });
  };

  return (
    <BackofficeLayout title="Emendas" subtitle="Gerencie as emendas cadastradas">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button asChild>
                  <Link to="/admin/emendas/nova">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Emenda
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, objeto ou município..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={exercicio} onValueChange={setExercicio}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Exercício" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {exerciciosDisponiveis.map((ex) => (
                    <SelectItem key={ex} value={String(ex)}>{ex}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="publicavel">Publicável</SelectItem>
                  <SelectItem value="publicada">Publicada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Município</TableHead>
                    <TableHead>Valor Indicado</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : data?.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhuma emenda encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.data.map((emenda) => (
                      <TableRow key={emenda.id}>
                        <TableCell className="font-medium">{emenda.numero}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{emenda.objeto}</TableCell>
                        <TableCell>{emenda.recebedor.municipio}</TableCell>
                        <TableCell>{formatCurrency(emenda.valorIndicado)}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[emenda.status] || ""}>
                            {statusLabels[emenda.status] || emenda.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/consulta/${emenda.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Visualizar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/emendas/${emenda.id}/editar`}>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(emenda.id)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteId(emenda.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-between border-t px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  Página {data.page} de {data.totalPages} ({data.total} registros)
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir emenda?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A emenda será permanentemente removida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </BackofficeLayout>
  );
}
