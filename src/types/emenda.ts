// Portal de Emendas MPC-MG - Tipos principais
// Baseado na Recomendação MPC-MG nº 01/2025

export type TipoConcedente = 'parlamentar' | 'bancada' | 'comissao' | 'outro';

export type TipoRecebedor = 'prefeitura' | 'estado' | 'ong' | 'outro';

export type TipoObjeto = 
  | 'saude' 
  | 'educacao' 
  | 'infraestrutura' 
  | 'assistencia' 
  | 'cultura' 
  | 'esporte' 
  | 'outro';

export type GND = 'gnd3' | 'gnd4' | 'outro';

export type ModalidadeTransferencia = 'especial' | 'fundo' | 'convenio' | 'outro';

export type StatusEmenda = 'rascunho' | 'publicavel' | 'publicada';

export type StatusConformidade = 'ok' | 'pendente' | 'erro';

export type AnuenciaSus = 'sim' | 'nao' | 'na';

export type TipoEvento = 
  | 'DISPONIBILIZAÇÃO' 
  | 'EMPENHO' 
  | 'LIQUIDAÇÃO' 
  | 'PAGAMENTO' 
  | 'CADASTRO' 
  | 'PUBLICAÇÃO';

export interface Concedente {
  tipo: TipoConcedente;
  nome: string;
  descricaoOutro?: string; // quando tipo = 'outro'
}

export interface Recebedor {
  tipo: TipoRecebedor;
  nome: string;
  cnpj: string;
  municipio: string;
  uf: string;
  codigoIbge: string;
}

export interface Objeto {
  tipo: TipoObjeto;
  descricao: string;
  gnd: GND;
}

export interface ContaBancaria {
  banco?: string;
  agencia?: string;
  conta?: string;
}

export interface EventoFinanceiro {
  id: string;
  tipo: TipoEvento;
  data: string; // ISO date string
  valor?: number;
  observacao?: string;
}

export interface Gestor {
  nome: string;
}

export interface EmendaRecord {
  id: string;
  numero: string;
  exercicio: number;
  modalidade?: ModalidadeTransferencia;
  status: StatusEmenda;
  conformidade: StatusConformidade;
  
  concedente: Concedente;
  recebedor: Recebedor;
  objeto: Objeto;
  
  valorIndicado: number;
  valorDisponibilizado: number;
  
  gestor: Gestor;
  anuenciaSus: AnuenciaSus;
  motivoSemAnuencia?: string; // obrigatório se anuenciaSus = 'nao'
  
  contaBancaria?: ContaBancaria;
  eventos: EventoFinanceiro[];
  
  criadoEm: string;
  atualizadoEm: string;
  criadoPor?: string;
  atualizadoPor?: string;
}

// Tipo para criação (sem id e timestamps automáticos)
export type EmendaCreateInput = Omit<EmendaRecord, 'id' | 'criadoEm' | 'atualizadoEm' | 'valorDisponibilizado' | 'conformidade'>;

// Tipo para atualização parcial
export type EmendaUpdateInput = Partial<EmendaCreateInput>;

// Tipo para listagem (subset de campos)
export interface EmendaListItem {
  id: string;
  numero: string;
  exercicio: number;
  concedente: Pick<Concedente, 'tipo' | 'nome'>;
  recebedor: Pick<Recebedor, 'nome' | 'municipio' | 'uf'>;
  objeto: string; // apenas descrição resumida
  gnd: GND;
  valorIndicado: number;
  valorDisponibilizado: number;
  status: StatusEmenda;
  conformidade: StatusConformidade;
}

// Filtros para consulta
export interface EmendaFilters {
  search?: string;
  exercicio?: number;
  tipoConcedente?: TipoConcedente;
  gnd?: GND;
  status?: StatusEmenda;
  conformidade?: StatusConformidade;
  municipio?: string;
}

// Paginação
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
