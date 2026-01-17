import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  FileText, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  BarChart3,
  Shield,
  BookOpen
} from "lucide-react";

const etapas = [
  {
    icon: Database,
    titulo: "1. Coleta de Dados",
    descricao: "Obtenção de informações de emendas parlamentares diretamente dos sistemas oficiais do governo.",
    detalhes: [
      "Extração de dados do SIAFI (Sistema Integrado de Administração Financeira)",
      "Consulta ao Portal da Transparência",
      "Integração com sistemas estaduais e municipais",
      "Atualização periódica das informações",
    ],
  },
  {
    icon: Search,
    titulo: "2. Processamento e Validação",
    descricao: "Tratamento dos dados coletados para garantir consistência e qualidade das informações.",
    detalhes: [
      "Validação de CNPJ e dados cadastrais",
      "Verificação de valores e datas",
      "Cruzamento de informações entre fontes",
      "Identificação e correção de inconsistências",
    ],
  },
  {
    icon: CheckCircle,
    titulo: "3. Análise de Conformidade",
    descricao: "Verificação do cumprimento de requisitos legais e regulatórios.",
    detalhes: [
      "Análise de documentação obrigatória",
      "Verificação de prazos e limites",
      "Conferência de destinação de recursos",
      "Avaliação de regularidade fiscal",
    ],
  },
  {
    icon: AlertTriangle,
    titulo: "4. Identificação de Riscos",
    descricao: "Detecção de possíveis irregularidades ou pontos de atenção.",
    detalhes: [
      "Alertas de valores atípicos",
      "Identificação de padrões suspeitos",
      "Análise de histórico de beneficiários",
      "Classificação por nível de risco",
    ],
  },
  {
    icon: BarChart3,
    titulo: "5. Geração de Relatórios",
    descricao: "Produção de relatórios e indicadores para acompanhamento.",
    detalhes: [
      "Dashboards interativos",
      "Relatórios por período e região",
      "Indicadores de desempenho",
      "Exportação em múltiplos formatos",
    ],
  },
  {
    icon: Shield,
    titulo: "6. Publicação e Transparência",
    descricao: "Disponibilização das informações ao público de forma acessível.",
    detalhes: [
      "Portal público de consulta",
      "API para integração com outros sistemas",
      "Dados abertos em formato padrão",
      "Atualização em tempo real",
    ],
  },
];

const faq = [
  {
    pergunta: "Qual a periodicidade de atualização dos dados?",
    resposta: "Os dados são atualizados diariamente, com informações do dia anterior. Algumas informações, como status de execução financeira, podem ter atualização em tempo real dependendo da disponibilidade dos sistemas de origem.",
  },
  {
    pergunta: "Como é feita a verificação de conformidade?",
    resposta: "A verificação de conformidade segue critérios estabelecidos pela legislação vigente, incluindo a Lei de Responsabilidade Fiscal, Lei de Licitações e normativas específicas para transferências voluntárias. São analisados documentos, prazos, valores e regularidade fiscal dos beneficiários.",
  },
  {
    pergunta: "O que significa cada status de emenda?",
    resposta: "Os status indicam a fase de execução: 'Indicada' significa que a emenda foi alocada no orçamento; 'Empenhada' indica que houve reserva orçamentária; 'Liquidada' significa que a despesa foi verificada; 'Paga' indica que o recurso foi efetivamente transferido.",
  },
  {
    pergunta: "Como posso reportar uma inconsistência?",
    resposta: "Caso identifique alguma inconsistência nos dados, você pode utilizar o canal de ouvidoria do MPC-MG ou enviar uma mensagem através do formulário de contato disponível no portal. Todas as comunicações são analisadas pela equipe técnica.",
  },
  {
    pergunta: "Os dados são oficiais?",
    resposta: "Sim, todos os dados apresentados são obtidos de fontes oficiais do governo, incluindo o Portal da Transparência, SIAFI e sistemas estaduais. O MPC-MG não altera os dados originais, apenas os organiza e apresenta de forma mais acessível.",
  },
];

export default function Metodologia() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Metodologia</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça como coletamos, processamos e disponibilizamos as informações 
            sobre emendas parlamentares para garantir transparência e qualidade dos dados.
          </p>
        </div>

        {/* Etapas do Processo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Etapas do Processo</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {etapas.map((etapa) => (
              <Card key={etapa.titulo} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <etapa.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{etapa.titulo}</CardTitle>
                  </div>
                  <CardDescription>{etapa.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {etapa.detalhes.map((detalhe, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{detalhe}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Fontes de Dados */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Fontes de Dados
              </CardTitle>
              <CardDescription>
                Origem das informações utilizadas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium mb-2">Fontes Federais</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Portal da Transparência do Governo Federal</li>
                    <li>• SIAFI - Sistema Integrado de Administração Financeira</li>
                    <li>• SICONV/Transferegov</li>
                    <li>• Câmara dos Deputados - Dados Abertos</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium mb-2">Fontes Estaduais</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Portal da Transparência de Minas Gerais</li>
                    <li>• SIAFI-MG</li>
                    <li>• Assembleia Legislativa de Minas Gerais</li>
                    <li>• Tribunal de Contas do Estado</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Perguntas Frequentes</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.pergunta}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.resposta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </div>
    </PublicLayout>
  );
}
