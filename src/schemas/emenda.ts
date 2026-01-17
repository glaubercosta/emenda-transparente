// Portal de Emendas MPC-MG - Schemas Zod
// Validação completa conforme Recomendação MPC-MG nº 01/2025

import { z } from 'zod';

// Regex para validações
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const CODIGO_IBGE_REGEX = /^\d{7}$/;
const NUMERO_EMENDA_REGEX = /^\d+\/\d{4}$/;

// Helpers de validação
const cnpjValidator = z.string()
  .min(1, 'CNPJ é obrigatório')
  .regex(CNPJ_REGEX, 'CNPJ deve estar no formato 00.000.000/0000-00');

const codigoIbgeValidator = z.string()
  .min(1, 'Código IBGE é obrigatório')
  .regex(CODIGO_IBGE_REGEX, 'Código IBGE deve ter 7 dígitos');

// Enums
export const tipoConcedente = z.enum(['parlamentar', 'bancada', 'comissao', 'outro']);
export const tipoRecebedor = z.enum(['prefeitura', 'estado', 'ong', 'outro']);
export const tipoObjeto = z.enum(['saude', 'educacao', 'infraestrutura', 'assistencia', 'cultura', 'esporte', 'outro']);
export const gnd = z.enum(['gnd3', 'gnd4', 'outro']);
export const modalidadeTransferencia = z.enum(['especial', 'fundo', 'convenio', 'outro']);
export const statusEmenda = z.enum(['rascunho', 'publicavel', 'publicada']);
export const anuenciaSus = z.enum(['sim', 'nao', 'na']);
export const tipoEvento = z.enum(['DISPONIBILIZAÇÃO', 'EMPENHO', 'LIQUIDAÇÃO', 'PAGAMENTO', 'CADASTRO', 'PUBLICAÇÃO']);

// Sub-schemas
export const concedenteSchema = z.object({
  tipo: tipoConcedente,
  nome: z.string().min(1, 'Nome do concedente é obrigatório').max(200, 'Nome muito longo'),
  descricaoOutro: z.string().optional(),
}).refine(
  (data) => data.tipo !== 'outro' || (data.descricaoOutro && data.descricaoOutro.length > 0),
  { message: 'Descrição é obrigatória quando tipo é "outro"', path: ['descricaoOutro'] }
);

export const recebedorSchema = z.object({
  tipo: tipoRecebedor,
  nome: z.string().min(1, 'Nome/Razão Social é obrigatório').max(200, 'Nome muito longo'),
  cnpj: cnpjValidator,
  municipio: z.string().min(1, 'Município é obrigatório').max(100, 'Nome muito longo'),
  uf: z.string().length(2, 'UF deve ter 2 caracteres'),
  codigoIbge: codigoIbgeValidator,
});

export const objetoSchema = z.object({
  tipo: tipoObjeto,
  descricao: z.string()
    .min(10, 'Descrição do objeto deve ter no mínimo 10 caracteres')
    .max(2000, 'Descrição muito longa'),
  gnd: gnd,
});

export const contaBancariaSchema = z.object({
  banco: z.string().optional(),
  agencia: z.string().optional(),
  conta: z.string().optional(),
});

export const eventoFinanceiroSchema = z.object({
  id: z.string(),
  tipo: tipoEvento,
  data: z.string().min(1, 'Data é obrigatória'),
  valor: z.number().min(0, 'Valor deve ser positivo').optional(),
  observacao: z.string().max(500, 'Observação muito longa').optional(),
});

export const gestorSchema = z.object({
  nome: z.string().min(1, 'Nome do gestor é obrigatório').max(200, 'Nome muito longo'),
});

// Schema do formulário por etapas
export const step1Schema = z.object({
  numero: z.string()
    .min(1, 'Número da emenda é obrigatório')
    .regex(NUMERO_EMENDA_REGEX, 'Formato inválido. Use: 000/0000'),
  exercicio: z.number().min(2020, 'Exercício inválido').max(2030, 'Exercício inválido'),
  modalidade: modalidadeTransferencia.optional(),
  status: statusEmenda,
});

export const step2Schema = concedenteSchema;

export const step3Schema = recebedorSchema;

export const step4Schema = z.object({
  objeto: objetoSchema,
  valorIndicado: z.number().positive('Valor indicado deve ser maior que zero'),
  gestor: gestorSchema,
  anuenciaSus: anuenciaSus,
  motivoSemAnuencia: z.string().optional(),
}).refine(
  (data) => data.anuenciaSus !== 'nao' || (data.motivoSemAnuencia && data.motivoSemAnuencia.length > 0),
  { message: 'Motivo é obrigatório quando Anuência SUS é "Não"', path: ['motivoSemAnuencia'] }
);

export const step5Schema = z.object({
  contaBancaria: contaBancariaSchema,
  eventos: z.array(eventoFinanceiroSchema).min(1, 'Ao menos um evento é obrigatório'),
});

// Schema completo da emenda (para validação final)
export const emendaFormSchema = z.object({
  numero: z.string()
    .min(1, 'Número da emenda é obrigatório')
    .regex(NUMERO_EMENDA_REGEX, 'Formato inválido. Use: 000/0000'),
  exercicio: z.number().min(2020).max(2030),
  modalidade: modalidadeTransferencia.optional(),
  status: statusEmenda,
  concedente: concedenteSchema,
  recebedor: recebedorSchema,
  objeto: objetoSchema,
  valorIndicado: z.number().positive('Valor indicado deve ser maior que zero'),
  gestor: gestorSchema,
  anuenciaSus: anuenciaSus,
  motivoSemAnuencia: z.string().optional(),
  contaBancaria: contaBancariaSchema,
  eventos: z.array(eventoFinanceiroSchema),
}).refine(
  (data) => data.anuenciaSus !== 'nao' || (data.motivoSemAnuencia && data.motivoSemAnuencia.length > 0),
  { message: 'Motivo é obrigatório quando Anuência SUS é "Não"', path: ['motivoSemAnuencia'] }
);

// Schema para publicação (requer evento de disponibilização)
export const emendaPublishSchema = emendaFormSchema.refine(
  (data) => data.eventos.some(e => e.tipo === 'DISPONIBILIZAÇÃO'),
  { message: 'É obrigatório ter ao menos um evento de DISPONIBILIZAÇÃO para publicar', path: ['eventos'] }
);

// Types inferidos
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;
export type EmendaFormData = z.infer<typeof emendaFormSchema>;
