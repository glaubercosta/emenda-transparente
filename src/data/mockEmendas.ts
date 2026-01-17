// Portal de Emendas MPC-MG - Dados mock para desenvolvimento
// Popula localStorage com dados de exemplo

import type { EmendaRecord } from '@/types/emenda';
import { generateId } from '@/defaults/emenda';

const STORAGE_KEY = 'emendas_mpc_mg';

export const mockEmendas: EmendaRecord[] = [
  {
    id: generateId(),
    numero: "847/2024",
    exercicio: 2024,
    modalidade: "especial",
    status: "publicada",
    conformidade: "ok",
    concedente: {
      tipo: "parlamentar",
      nome: "Dep. Maria Santos",
    },
    recebedor: {
      tipo: "prefeitura",
      nome: "Prefeitura Municipal de Belo Horizonte",
      cnpj: "18.715.383/0001-40",
      municipio: "Belo Horizonte",
      uf: "MG",
      codigoIbge: "3106200",
    },
    objeto: {
      tipo: "saude",
      descricao: "Construção de Unidade Básica de Saúde no Bairro Venda Nova, com capacidade para atendimento de 15.000 habitantes, contemplando consultórios médicos, sala de vacinação, farmácia básica e área administrativa.",
      gnd: "gnd4",
    },
    valorIndicado: 1500000,
    valorDisponibilizado: 1500000,
    gestor: {
      nome: "Dr. Carlos Alberto de Souza",
    },
    anuenciaSus: "sim",
    contaBancaria: {
      banco: "bb",
      agencia: "1234-5",
      conta: "12345-6",
    },
    eventos: [
      {
        id: generateId(),
        tipo: "DISPONIBILIZAÇÃO",
        data: "2024-03-20",
        valor: 750000,
        observacao: "Primeira parcela liberada",
      },
      {
        id: generateId(),
        tipo: "DISPONIBILIZAÇÃO",
        data: "2024-05-10",
        valor: 750000,
        observacao: "Segunda parcela liberada",
      },
    ],
    criadoEm: "2024-02-15T10:00:00Z",
    atualizadoEm: "2024-05-15T14:30:00Z",
    criadoPor: "João Silva",
  },
  {
    id: generateId(),
    numero: "846/2024",
    exercicio: 2024,
    modalidade: "convenio",
    status: "publicavel",
    conformidade: "pendente",
    concedente: {
      tipo: "bancada",
      nome: "Bancada do Interior",
    },
    recebedor: {
      tipo: "prefeitura",
      nome: "Prefeitura Municipal de Uberlândia",
      cnpj: "18.431.312/0001-50",
      municipio: "Uberlândia",
      uf: "MG",
      codigoIbge: "3170206",
    },
    objeto: {
      tipo: "saude",
      descricao: "Aquisição de equipamentos hospitalares para o Hospital Municipal, incluindo tomógrafo, aparelhos de raio-x e monitores cardíacos.",
      gnd: "gnd4",
    },
    valorIndicado: 890000,
    valorDisponibilizado: 0,
    gestor: {
      nome: "Dra. Ana Paula Ferreira",
    },
    anuenciaSus: "sim",
    eventos: [],
    criadoEm: "2024-03-01T09:00:00Z",
    atualizadoEm: "2024-03-01T09:00:00Z",
  },
  {
    id: generateId(),
    numero: "845/2024",
    exercicio: 2024,
    modalidade: "especial",
    status: "publicada",
    conformidade: "ok",
    concedente: {
      tipo: "parlamentar",
      nome: "Dep. João Oliveira",
    },
    recebedor: {
      tipo: "prefeitura",
      nome: "Prefeitura Municipal de Juiz de Fora",
      cnpj: "18.338.178/0001-02",
      municipio: "Juiz de Fora",
      uf: "MG",
      codigoIbge: "3136702",
    },
    objeto: {
      tipo: "infraestrutura",
      descricao: "Pavimentação de vias urbanas no centro histórico, incluindo calçamento em pedra portuguesa e instalação de drenagem pluvial.",
      gnd: "gnd4",
    },
    valorIndicado: 2100000,
    valorDisponibilizado: 2100000,
    gestor: {
      nome: "Eng. Roberto Mendes",
    },
    anuenciaSus: "na",
    contaBancaria: {
      banco: "caixa",
      agencia: "0987-6",
      conta: "98765-4",
    },
    eventos: [
      {
        id: generateId(),
        tipo: "DISPONIBILIZAÇÃO",
        data: "2024-04-15",
        valor: 2100000,
        observacao: "Valor integral liberado",
      },
    ],
    criadoEm: "2024-02-20T11:00:00Z",
    atualizadoEm: "2024-04-15T16:00:00Z",
  },
  {
    id: generateId(),
    numero: "844/2024",
    exercicio: 2024,
    modalidade: "fundo",
    status: "publicavel",
    conformidade: "pendente",
    concedente: {
      tipo: "comissao",
      nome: "Comissão de Saúde",
    },
    recebedor: {
      tipo: "prefeitura",
      nome: "Prefeitura Municipal de Montes Claros",
      cnpj: "22.678.874/0001-38",
      municipio: "Montes Claros",
      uf: "MG",
      codigoIbge: "3143302",
    },
    objeto: {
      tipo: "saude",
      descricao: "Reforma de Centro de Saúde Municipal com adequação às normas de acessibilidade e ampliação da área de atendimento.",
      gnd: "gnd3",
    },
    valorIndicado: 750000,
    valorDisponibilizado: 500000,
    gestor: {
      nome: "Dra. Fernanda Lima",
    },
    anuenciaSus: "sim",
    eventos: [
      {
        id: generateId(),
        tipo: "DISPONIBILIZAÇÃO",
        data: "2024-03-25",
        valor: 500000,
        observacao: "Primeira parcela",
      },
    ],
    criadoEm: "2024-02-28T14:00:00Z",
    atualizadoEm: "2024-03-25T10:00:00Z",
  },
  {
    id: generateId(),
    numero: "843/2024",
    exercicio: 2024,
    modalidade: "especial",
    status: "publicada",
    conformidade: "ok",
    concedente: {
      tipo: "parlamentar",
      nome: "Dep. Ana Paula",
    },
    recebedor: {
      tipo: "prefeitura",
      nome: "Prefeitura Municipal de Governador Valadares",
      cnpj: "18.404.780/0001-77",
      municipio: "Governador Valadares",
      uf: "MG",
      codigoIbge: "3127701",
    },
    objeto: {
      tipo: "educacao",
      descricao: "Construção de creche municipal no Bairro São Paulo com capacidade para 120 crianças de 0 a 5 anos.",
      gnd: "gnd4",
    },
    valorIndicado: 1200000,
    valorDisponibilizado: 1200000,
    gestor: {
      nome: "Prof. Marcos Antônio",
    },
    anuenciaSus: "na",
    contaBancaria: {
      banco: "bb",
      agencia: "2345-6",
      conta: "34567-8",
    },
    eventos: [
      {
        id: generateId(),
        tipo: "DISPONIBILIZAÇÃO",
        data: "2024-04-01",
        valor: 600000,
        observacao: "Primeira parcela",
      },
      {
        id: generateId(),
        tipo: "DISPONIBILIZAÇÃO",
        data: "2024-05-01",
        valor: 600000,
        observacao: "Segunda parcela",
      },
    ],
    criadoEm: "2024-03-10T09:00:00Z",
    atualizadoEm: "2024-05-01T11:00:00Z",
  },
];

// Função para popular o localStorage com dados mock
export const seedMockData = (): void => {
  const existing = localStorage.getItem(STORAGE_KEY);
  
  if (!existing || JSON.parse(existing).length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmendas));
    console.log('✅ Dados mock inseridos no localStorage');
  } else {
    console.log('ℹ️ Dados já existem no localStorage');
  }
};

// Função para limpar e repopular
export const resetMockData = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmendas));
  console.log('✅ Dados mock resetados');
};

// Função para limpar todos os dados
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  console.log('✅ Todos os dados removidos');
};
