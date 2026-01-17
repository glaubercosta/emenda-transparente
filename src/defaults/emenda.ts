// Portal de Emendas MPC-MG - Valores padrão
// Defaults para formulários e inicialização

import type { 
  EmendaRecord, 
  EventoFinanceiro, 
  Concedente, 
  Recebedor, 
  Objeto,
  ContaBancaria,
  Gestor,
  EmendaCreateInput 
} from '@/types/emenda';

// Gera UUID simples
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Ano atual
export const currentYear = new Date().getFullYear();

// Anos disponíveis para seleção
export const exerciciosDisponiveis = [2024, 2023, 2022, 2021, 2020];

// UFs disponíveis
export const ufsDisponiveis = [
  { value: 'MG', label: 'Minas Gerais' },
];

// Bancos disponíveis
export const bancosDisponiveis = [
  { value: 'bb', label: 'Banco do Brasil' },
  { value: 'caixa', label: 'Caixa Econômica Federal' },
  { value: 'bradesco', label: 'Bradesco' },
  { value: 'itau', label: 'Itaú' },
  { value: 'santander', label: 'Santander' },
  { value: 'sicoob', label: 'Sicoob' },
  { value: 'sicredi', label: 'Sicredi' },
];

// Modalidades de transferência
export const modalidadesTransferencia = [
  { value: 'especial', label: 'Transferência Especial' },
  { value: 'fundo', label: 'Fundo a Fundo' },
  { value: 'convenio', label: 'Convênio' },
  { value: 'outro', label: 'Outro' },
];

// Tipos de concedente
export const tiposConcedente = [
  { value: 'parlamentar', label: 'Parlamentar', description: 'Deputado individual' },
  { value: 'bancada', label: 'Bancada', description: 'Bancada partidária' },
  { value: 'comissao', label: 'Comissão', description: 'Comissão permanente' },
  { value: 'outro', label: 'Outro', description: 'Especificar' },
];

// Tipos de recebedor
export const tiposRecebedor = [
  { value: 'prefeitura', label: 'Prefeitura Municipal' },
  { value: 'estado', label: 'Governo do Estado' },
  { value: 'ong', label: 'ONG / Entidade' },
  { value: 'outro', label: 'Outro' },
];

// Tipos de objeto
export const tiposObjeto = [
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
  { value: 'infraestrutura', label: 'Infraestrutura' },
  { value: 'assistencia', label: 'Assistência Social' },
  { value: 'cultura', label: 'Cultura' },
  { value: 'esporte', label: 'Esporte' },
  { value: 'outro', label: 'Outro' },
];

// GNDs
export const gndsDisponiveis = [
  { value: 'gnd3', label: 'GND3 - Custeio', description: 'Despesas correntes' },
  { value: 'gnd4', label: 'GND4 - Investimento', description: 'Despesas de capital' },
  { value: 'outro', label: 'Outro', description: 'Outra classificação' },
];

// Tipos de evento
export const tiposEvento = [
  { value: 'DISPONIBILIZAÇÃO', label: 'Disponibilização' },
  { value: 'EMPENHO', label: 'Empenho' },
  { value: 'LIQUIDAÇÃO', label: 'Liquidação' },
  { value: 'PAGAMENTO', label: 'Pagamento' },
];

// Defaults para novo concedente
export const defaultConcedente: Concedente = {
  tipo: 'parlamentar',
  nome: '',
};

// Defaults para novo recebedor
export const defaultRecebedor: Recebedor = {
  tipo: 'prefeitura',
  nome: '',
  cnpj: '',
  municipio: '',
  uf: 'MG',
  codigoIbge: '',
};

// Defaults para novo objeto
export const defaultObjeto: Objeto = {
  tipo: 'saude',
  descricao: '',
  gnd: 'gnd4',
};

// Defaults para conta bancária
export const defaultContaBancaria: ContaBancaria = {
  banco: '',
  agencia: '',
  conta: '',
};

// Defaults para gestor
export const defaultGestor: Gestor = {
  nome: '',
};

// Defaults para novo evento financeiro
export const createDefaultEvento = (): EventoFinanceiro => ({
  id: generateId(),
  tipo: 'DISPONIBILIZAÇÃO',
  data: '',
  valor: undefined,
  observacao: '',
});

// Defaults para nova emenda (formulário)
export const defaultEmendaForm = {
  numero: '',
  exercicio: currentYear,
  modalidade: undefined,
  status: 'rascunho' as const,
  concedente: defaultConcedente,
  recebedor: defaultRecebedor,
  objeto: defaultObjeto,
  valorIndicado: 0,
  gestor: defaultGestor,
  anuenciaSus: 'na' as const,
  motivoSemAnuencia: '',
  contaBancaria: defaultContaBancaria,
  eventos: [createDefaultEvento()],
};

// Calcula valor disponibilizado a partir dos eventos
export const calcularValorDisponibilizado = (eventos: EventoFinanceiro[]): number => {
  return eventos
    .filter(e => e.tipo === 'DISPONIBILIZAÇÃO' && e.valor)
    .reduce((sum, e) => sum + (e.valor || 0), 0);
};

// Calcula status de conformidade
export const calcularConformidade = (emenda: Partial<EmendaCreateInput>): 'ok' | 'pendente' | 'erro' => {
  const temDisponibilizacao = emenda.eventos?.some(e => e.tipo === 'DISPONIBILIZAÇÃO');
  const temDadosRecebedor = emenda.recebedor?.cnpj && emenda.recebedor?.codigoIbge;
  const temObjeto = emenda.objeto?.descricao && emenda.objeto?.gnd;
  
  if (!temDisponibilizacao) return 'pendente';
  if (!temDadosRecebedor || !temObjeto) return 'pendente';
  
  return 'ok';
};
