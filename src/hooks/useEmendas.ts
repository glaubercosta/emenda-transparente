// Portal de Emendas MPC-MG - React Query Hooks
// Hooks para gerenciamento de estado e cache de emendas

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { storageRepository } from '@/services/storage';
import type { 
  EmendaRecord, 
  EmendaFilters, 
  PaginationParams,
  EmendaCreateInput 
} from '@/types/emenda';
import { toast } from '@/hooks/use-toast';

// Query keys
export const emendaKeys = {
  all: ['emendas'] as const,
  lists: () => [...emendaKeys.all, 'list'] as const,
  list: (filters?: EmendaFilters, pagination?: PaginationParams) => 
    [...emendaKeys.lists(), { filters, pagination }] as const,
  details: () => [...emendaKeys.all, 'detail'] as const,
  detail: (id: string) => [...emendaKeys.details(), id] as const,
};

// Hook para listar emendas
export function useEmendasList(filters?: EmendaFilters, pagination?: PaginationParams) {
  return useQuery({
    queryKey: emendaKeys.list(filters, pagination),
    queryFn: () => storageRepository.list(filters, pagination),
    staleTime: 1000 * 60, // 1 minuto
  });
}

// Hook para buscar emenda por ID
export function useEmendaById(id: string | undefined) {
  return useQuery({
    queryKey: emendaKeys.detail(id || ''),
    queryFn: () => storageRepository.getById(id!),
    enabled: !!id,
  });
}

// Hook para criar emenda
export function useCreateEmenda() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: EmendaCreateInput) => storageRepository.create(data),
    onSuccess: (newEmenda) => {
      queryClient.invalidateQueries({ queryKey: emendaKeys.lists() });
      toast({
        title: 'Emenda criada',
        description: `Emenda ${newEmenda.numero} criada com sucesso.`,
      });
    },
    onError: () => {
      toast({
        title: 'Erro ao criar emenda',
        description: 'Ocorreu um erro ao salvar a emenda. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

// Hook para atualizar emenda
export function useUpdateEmenda() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmendaRecord> }) => 
      storageRepository.update(id, data),
    onSuccess: (updatedEmenda) => {
      if (updatedEmenda) {
        queryClient.invalidateQueries({ queryKey: emendaKeys.lists() });
        queryClient.setQueryData(emendaKeys.detail(updatedEmenda.id), updatedEmenda);
        toast({
          title: 'Emenda atualizada',
          description: `Emenda ${updatedEmenda.numero} atualizada com sucesso.`,
        });
      }
    },
    onError: () => {
      toast({
        title: 'Erro ao atualizar',
        description: 'Ocorreu um erro ao atualizar a emenda. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

// Hook para excluir emenda
export function useDeleteEmenda() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => storageRepository.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: emendaKeys.lists() });
      queryClient.removeQueries({ queryKey: emendaKeys.detail(id) });
      toast({
        title: 'Emenda excluída',
        description: 'A emenda foi excluída com sucesso.',
      });
    },
    onError: () => {
      toast({
        title: 'Erro ao excluir',
        description: 'Ocorreu um erro ao excluir a emenda. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

// Hook para duplicar emenda
export function useDuplicateEmenda() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => storageRepository.duplicate(id),
    onSuccess: (newEmenda) => {
      if (newEmenda) {
        queryClient.invalidateQueries({ queryKey: emendaKeys.lists() });
        toast({
          title: 'Emenda duplicada',
          description: `Nova emenda ${newEmenda.numero} criada como cópia.`,
        });
      }
    },
    onError: () => {
      toast({
        title: 'Erro ao duplicar',
        description: 'Ocorreu um erro ao duplicar a emenda. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

// Hook para exportação
export function useExportEmendas() {
  return useMutation({
    mutationFn: async ({ format, filters }: { format: 'csv' | 'json'; filters?: EmendaFilters }) => {
      const content = format === 'csv' 
        ? await storageRepository.exportCsv(filters)
        : await storageRepository.exportJson(filters);
      
      const blob = new Blob([content], { 
        type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `emendas_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    },
    onSuccess: () => {
      toast({
        title: 'Exportação concluída',
        description: 'O arquivo foi baixado com sucesso.',
      });
    },
    onError: () => {
      toast({
        title: 'Erro na exportação',
        description: 'Ocorreu um erro ao exportar os dados. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

// Hook para gerenciar rascunho
export function useDraft() {
  return {
    saveDraft: storageRepository.saveDraft,
    loadDraft: storageRepository.loadDraft,
    clearDraft: storageRepository.clearDraft,
  };
}
