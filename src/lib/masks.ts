// Portal de Emendas MPC-MG - Máscaras de input
// Funções para formatação de campos

// Máscara de CNPJ: 00.000.000/0000-00
export const maskCnpj = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 14);
  
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
  if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12)}`;
};

// Máscara de CPF: 000.000.000-00
export const maskCpf = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
};

// Máscara de telefone: (00) 00000-0000
export const maskPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  
  if (numbers.length <= 2) return numbers.length ? `(${numbers}` : '';
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

// Máscara de CEP: 00000-000
export const maskCep = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 8);
  
  if (numbers.length <= 5) return numbers;
  return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
};

// Máscara de valor monetário: 1.234.567,89
export const maskCurrency = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) return '';
  
  // Converte para número e formata
  const amount = parseInt(numbers, 10) / 100;
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Converte valor formatado para número
export const unmaskCurrency = (value: string): number => {
  const numbers = value.replace(/\D/g, '');
  return numbers ? parseInt(numbers, 10) / 100 : 0;
};

// Máscara de número de emenda: 000/0000
export const maskNumeroEmenda = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 8);
  
  if (numbers.length <= 3) return numbers;
  return `${numbers.slice(0, numbers.length - 4)}/${numbers.slice(-4)}`;
};

// Máscara de agência: 0000-0
export const maskAgencia = (value: string): string => {
  const alphanumeric = value.replace(/[^0-9X]/gi, '').slice(0, 5).toUpperCase();
  
  if (alphanumeric.length <= 4) return alphanumeric;
  return `${alphanumeric.slice(0, 4)}-${alphanumeric.slice(4)}`;
};

// Máscara de conta: 00000-0
export const maskConta = (value: string): string => {
  const alphanumeric = value.replace(/[^0-9X]/gi, '').slice(0, 12).toUpperCase();
  
  if (alphanumeric.length <= 1) return alphanumeric;
  return `${alphanumeric.slice(0, -1)}-${alphanumeric.slice(-1)}`;
};

// Máscara de código IBGE: 0000000
export const maskCodigoIbge = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 7);
};

// Formata valor para exibição
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Formata data para exibição
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR');
};

// Formata data e hora
export const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('pt-BR');
};
