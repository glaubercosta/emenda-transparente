import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Save,
  FileText,
  Building2,
  Users,
  Target,
  Landmark,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BackofficeLayout } from "@/components/layout/BackofficeLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Identificação", icon: FileText },
  { id: 2, title: "Concedente", icon: Building2 },
  { id: 3, title: "Recebedor", icon: Users },
  { id: 4, title: "Objeto", icon: Target },
  { id: 5, title: "Conta e Eventos", icon: Landmark },
];

interface EventoFinanceiro {
  id: number;
  tipo: string;
  data: string;
  valor: string;
  observacao: string;
}

export default function NovaEmenda() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [eventos, setEventos] = useState<EventoFinanceiro[]>([
    { id: 1, tipo: "DISPONIBILIZAÇÃO", data: "", valor: "", observacao: "" }
  ]);

  const addEvento = () => {
    setEventos([
      ...eventos,
      { id: Date.now(), tipo: "DISPONIBILIZAÇÃO", data: "", valor: "", observacao: "" }
    ]);
  };

  const removeEvento = (id: number) => {
    if (eventos.length > 1) {
      setEventos(eventos.filter(e => e.id !== id));
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <BackofficeLayout title="Nova Emenda" subtitle="Cadastro de emenda parlamentar">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "wizard-step",
                    currentStep === step.id && "wizard-step-active",
                    currentStep > step.id && "wizard-step-complete",
                    currentStep < step.id && "wizard-step-pending"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-2 font-medium hidden sm:block",
                  currentStep === step.id ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-full h-0.5 mx-2 sm:mx-4",
                  currentStep > step.id ? "bg-success" : "bg-muted"
                )} style={{ minWidth: '2rem', maxWidth: '8rem' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="max-w-4xl mx-auto">
        {/* Step 1: Identificação */}
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle>Identificação da Emenda</CardTitle>
              <CardDescription>
                Informe os dados básicos de identificação da emenda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="numero">Número da Emenda *</Label>
                  <Input id="numero" placeholder="Ex: 847/2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exercicio">Exercício *</Label>
                  <Select defaultValue="2024">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modalidade">Modalidade de Transferência</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="especial">Transferência Especial</SelectItem>
                    <SelectItem value="fundo">Fundo a Fundo</SelectItem>
                    <SelectItem value="convenio">Convênio</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Status</Label>
                <RadioGroup defaultValue="rascunho" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rascunho" id="rascunho" />
                    <Label htmlFor="rascunho" className="font-normal cursor-pointer">
                      Rascunho
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="publicavel" id="publicavel" />
                    <Label htmlFor="publicavel" className="font-normal cursor-pointer">
                      Pronto para publicar
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 2: Concedente */}
        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle>Dados do Concedente</CardTitle>
              <CardDescription>
                Informe o tipo e identificação do concedente da emenda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Tipo de Concedente *</Label>
                <RadioGroup defaultValue="parlamentar" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="parlamentar" id="parlamentar" />
                    <Label htmlFor="parlamentar" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium block">Parlamentar</span>
                      <span className="text-sm text-muted-foreground">Deputado individual</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="bancada" id="bancada" />
                    <Label htmlFor="bancada" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium block">Bancada</span>
                      <span className="text-sm text-muted-foreground">Bancada partidária</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="comissao" id="comissao" />
                    <Label htmlFor="comissao" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium block">Comissão</span>
                      <span className="text-sm text-muted-foreground">Comissão permanente</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="outro" id="outro" />
                    <Label htmlFor="outro" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium block">Outro</span>
                      <span className="text-sm text-muted-foreground">Especificar</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeConcedente">Nome do Concedente *</Label>
                <Input id="nomeConcedente" placeholder="Ex: Dep. Maria Santos" />
              </div>
            </CardContent>
          </>
        )}

        {/* Step 3: Recebedor */}
        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle>Dados do Recebedor</CardTitle>
              <CardDescription>
                Informe os dados do beneficiário da emenda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tipoRecebedor">Tipo de Recebedor *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prefeitura">Prefeitura Municipal</SelectItem>
                    <SelectItem value="estado">Governo do Estado</SelectItem>
                    <SelectItem value="ong">ONG / Entidade</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nomeRecebedor">Nome / Razão Social *</Label>
                  <Input id="nomeRecebedor" placeholder="Ex: Prefeitura Municipal de Belo Horizonte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" maxLength={18} />
                </div>
              </div>

              <Separator />

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="municipio">Município *</Label>
                  <Input id="municipio" placeholder="Ex: Belo Horizonte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uf">UF *</Label>
                  <Select defaultValue="MG">
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MG">MG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigoIbge">Código IBGE *</Label>
                  <Input id="codigoIbge" placeholder="Ex: 3106200" maxLength={7} />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 4: Objeto */}
        {currentStep === 4 && (
          <>
            <CardHeader>
              <CardTitle>Objeto e Classificação</CardTitle>
              <CardDescription>
                Descreva o objeto da emenda e sua classificação orçamentária
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tipoObjeto">Tipo do Objeto *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                      <SelectItem value="assistencia">Assistência Social</SelectItem>
                      <SelectItem value="cultura">Cultura</SelectItem>
                      <SelectItem value="esporte">Esporte</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gnd">GND *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o GND" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gnd3">GND3 - Custeio</SelectItem>
                      <SelectItem value="gnd4">GND4 - Investimento</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricaoObjeto">Descrição do Objeto *</Label>
                <Textarea 
                  id="descricaoObjeto" 
                  placeholder="Descreva detalhadamente o objeto da emenda..."
                  rows={4}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="valorIndicado">Valor Indicado (R$) *</Label>
                  <Input id="valorIndicado" placeholder="0,00" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gestor">Gestor Responsável *</Label>
                  <Input id="gestor" placeholder="Nome completo do gestor" />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Anuência SUS *</Label>
                <RadioGroup defaultValue="sim" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="anuencia-sim" />
                    <Label htmlFor="anuencia-sim" className="font-normal cursor-pointer">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="anuencia-nao" />
                    <Label htmlFor="anuencia-nao" className="font-normal cursor-pointer">Não</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id="anuencia-na" />
                    <Label htmlFor="anuencia-na" className="font-normal cursor-pointer">Não se aplica</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 5: Conta e Eventos */}
        {currentStep === 5 && (
          <>
            <CardHeader>
              <CardTitle>Conta Bancária e Eventos Financeiros</CardTitle>
              <CardDescription>
                Informe os dados bancários e registre os eventos de disponibilização
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="banco">Banco</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o banco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bb">Banco do Brasil</SelectItem>
                      <SelectItem value="caixa">Caixa Econômica Federal</SelectItem>
                      <SelectItem value="bradesco">Bradesco</SelectItem>
                      <SelectItem value="itau">Itaú</SelectItem>
                      <SelectItem value="santander">Santander</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencia">Agência</Label>
                  <Input id="agencia" placeholder="0000-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conta">Conta Corrente</Label>
                  <Input id="conta" placeholder="00000-0" />
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">Eventos Financeiros</h4>
                    <p className="text-sm text-muted-foreground">
                      Registre ao menos um evento de DISPONIBILIZAÇÃO para publicar
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={addEvento}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Evento
                  </Button>
                </div>

                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    É obrigatório registrar pelo menos um evento de DISPONIBILIZAÇÃO para que a emenda possa ser publicada.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {eventos.map((evento, index) => (
                    <Card key={evento.id} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="outline">Evento {index + 1}</Badge>
                          {eventos.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeEvento(evento.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="space-y-2">
                            <Label>Tipo</Label>
                            <Select defaultValue="DISPONIBILIZAÇÃO">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="DISPONIBILIZAÇÃO">DISPONIBILIZAÇÃO</SelectItem>
                                <SelectItem value="EMPENHO">EMPENHO</SelectItem>
                                <SelectItem value="LIQUIDAÇÃO">LIQUIDAÇÃO</SelectItem>
                                <SelectItem value="PAGAMENTO">PAGAMENTO</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Data *</Label>
                            <Input type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label>Valor (R$) *</Label>
                            <Input placeholder="0,00" />
                          </div>
                          <div className="space-y-2">
                            <Label>Observação</Label>
                            <Input placeholder="Opcional" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t bg-muted/30">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>

            {currentStep < 5 ? (
              <Button onClick={nextStep}>
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button variant="success">
                <Check className="h-4 w-4 mr-2" />
                Salvar e Publicar
              </Button>
            )}
          </div>
        </div>
      </Card>
    </BackofficeLayout>
  );
}
