// Portal de Emendas MPC-MG - Storage Repository
// Camada de abstração para persistência (localStorage/API futura)

import type { 
  EmendaRecord, 
  EmendaListItem, 
  EmendaFilters, 
  PaginationParams, 
  PaginatedResult 
} from '@/types/emenda';
import { generateId, calcularValorDisponibilizado, calcularConformidade } from '@/defaults/emenda';

const STORAGE_KEY = 'emendas_mpc_mg';
const DRAFT_KEY = 'emenda_draft_mpc_mg';

// Helpers
const getStoredEmendas = (): EmendaRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveEmendas = (emendas: EmendaRecord[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emendas));
};

// Storage Repository
export const storageRepository = {
  // Listar emendas com filtros e paginação
  list: async (
    filters?: EmendaFilters, 
    pagination?: PaginationParams
  ): Promise<PaginatedResult<EmendaListItem>> => {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 100));
    
    let emendas = getStoredEmendas();
    
    // Aplicar filtros
    if (filters) {
      if (filters.search) {
        const search = filters.search.toLowerCase();
        emendas = emendas.filter(e => 
          e.numero.toLowerCase().includes(search) ||
          e.objeto.descricao.toLowerCase().includes(search) ||
          e.concedente.nome.toLowerCase().includes(search) ||
          e.recebedor.municipio.toLowerCase().includes(search)
        );
      }
      if (filters.exercicio) {
        emendas = emendas.filter(e => e.exercicio === filters.exercicio);
      }
      if (filters.tipoConcedente) {
        emendas = emendas.filter(e => e.concedente.tipo === filters.tipoConcedente);
      }
      if (filters.gnd) {
        emendas = emendas.filter(e => e.objeto.gnd === filters.gnd);
      }
      if (filters.status) {
        emendas = emendas.filter(e => e.status === filters.status);
      }
      if (filters.conformidade) {
        emendas = emendas.filter(e => e.conformidade === filters.conformidade);
      }
    }
    
    const total = emendas.length;
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize);
    
    // Aplicar paginação
    const start = (page - 1) * pageSize;
    const paginatedEmendas = emendas.slice(start, start + pageSize);
    
    // Mapear para ListItem
    const data: EmendaListItem[] = paginatedEmendas.map(e => ({
      id: e.id,
      numero: e.numero,
      exercicio: e.exercicio,
      concedente: { tipo: e.concedente.tipo, nome: e.concedente.nome },
      recebedor: { nome: e.recebedor.nome, municipio: e.recebedor.municipio, uf: e.recebedor.uf },
      objeto: e.objeto.descricao.substring(0, 100) + (e.objeto.descricao.length > 100 ? '...' : ''),
      gnd: e.objeto.gnd,
      valorIndicado: e.valorIndicado,
      valorDisponibilizado: e.valorDisponibilizado,
      status: e.status,
      conformidade: e.conformidade,
    }));
    
    return { data, total, page, pageSize, totalPages };
  },
  
  // Buscar emenda por ID
  getById: async (id: string): Promise<EmendaRecord | null> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    const emendas = getStoredEmendas();
    return emendas.find(e => e.id === id) || null;
  },
  
  // Criar nova emenda
  create: async (data: Omit<EmendaRecord, 'id' | 'criadoEm' | 'atualizadoEm' | 'valorDisponibilizado' | 'conformidade'>): Promise<EmendaRecord> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const now = new Date().toISOString();
    const valorDisponibilizado = calcularValorDisponibilizado(data.eventos);
    const conformidade = calcularConformidade(data);
    
    const newEmenda: EmendaRecord = {
      ...data,
      id: generateId(),
      valorDisponibilizado,
      conformidade,
      criadoEm: now,
      atualizadoEm: now,
    };
    
    const emendas = getStoredEmendas();
    emendas.unshift(newEmenda); // Adiciona no início
    saveEmendas(emendas);
    
    return newEmenda;
  },
  
  // Atualizar emenda
  update: async (id: string, data: Partial<EmendaRecord>): Promise<EmendaRecord | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const emendas = getStoredEmendas();
    const index = emendas.findIndex(e => e.id === id);
    
    if (index === -1) return null;
    
    const updated: EmendaRecord = {
      ...emendas[index],
      ...data,
      valorDisponibilizado: data.eventos 
        ? calcularValorDisponibilizado(data.eventos) 
        : emendas[index].valorDisponibilizado,
      conformidade: calcularConformidade({ ...emendas[index], ...data }),
      atualizadoEm: new Date().toISOString(),
    };
    
    emendas[index] = updated;
    saveEmendas(emendas);
    
    return updated;
  },
  
  // Excluir emenda
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const emendas = getStoredEmendas();
    const filtered = emendas.filter(e => e.id !== id);
    
    if (filtered.length === emendas.length) return false;
    
    saveEmendas(filtered);
    return true;
  },
  
  // Duplicar emenda
  duplicate: async (id: string): Promise<EmendaRecord | null> => {
    const original = await storageRepository.getById(id);
    if (!original) return null;
    
    const { id: _, criadoEm, atualizadoEm, ...data } = original;
    
    return storageRepository.create({
      ...data,
      numero: `${original.numero}-COPIA`,
      status: 'rascunho',
    });
  },
  
  // Salvar rascunho
  saveDraft: (data: unknown): void => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  },
  
  // Carregar rascunho
  loadDraft: <T>(): T | null => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },
  
  // Limpar rascunho
  clearDraft: (): void => {
    localStorage.removeItem(DRAFT_KEY);
  },
  
  // Exportar para CSV
  exportCsv: async (filters?: EmendaFilters): Promise<string> => {
    const { data } = await storageRepository.list(filters, { page: 1, pageSize: 10000 });
    
    const headers = ['ID', 'Número', 'Exercício', 'Concedente', 'Tipo Concedente', 'Recebedor', 'Município', 'UF', 'Objeto', 'GND', 'Valor Indicado', 'Valor Disponibilizado', 'Status', 'Conformidade'];
    
    const rows = data.map(e => [
      e.id,
      e.numero,
      e.exercicio,
      e.concedente.nome,
      e.concedente.tipo,
      e.recebedor.nome,
      e.recebedor.municipio,
      e.recebedor.uf,
      `"${e.objeto.replace(/"/g, '""')}"`,
      e.gnd,
      e.valorIndicado,
      e.valorDisponibilizado,
      e.status,
      e.conformidade,
    ]);
    
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  },
  
  // Exportar para JSON
  exportJson: async (filters?: EmendaFilters): Promise<string> => {
    const { data } = await storageRepository.list(filters, { page: 1, pageSize: 10000 });
    return JSON.stringify(data, null, 2);
  },
};
