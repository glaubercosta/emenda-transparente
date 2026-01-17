import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  AlertCircle,
  Eye,
  RotateCcw,
  CheckCircle2
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { emendaFormSchema, type EmendaFormData } from "@/schemas/emenda";
import { 
  defaultEmendaForm, 
  createDefaultEvento,
  exerciciosDisponiveis,
  modalidadesTransferencia,
  tiposConcedente,
  tiposRecebedor,
  tiposObjeto,
  gndsDisponiveis,
  bancosDisponiveis,
  tiposEvento,
} from "@/defaults/emenda";
import { 
  maskCnpj, 
  maskCurrency, 
  unmaskCurrency, 
  maskCodigoIbge,
  maskAgencia,
  maskConta,
  formatCurrency,
} from "@/lib/masks";
import { useCreateEmenda, useDraft } from "@/hooks/useEmendas";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Identificação", icon: FileText },
  { id: 2, title: "Concedente", icon: Building2 },
  { id: 3, title: "Recebedor", icon: Users },
  { id: 4, title: "Objeto", icon: Target },
  { id: 5, title: "Conta e Eventos", icon: Landmark },
];

export default function NovaEmenda() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const { saveDraft, loadDraft, clearDraft } = useDraft();
  const createEmenda = useCreateEmenda();

  const form = useForm<EmendaFormData>({
    resolver: zodResolver(emendaFormSchema),
    defaultValues: defaultEmendaForm,
    mode: "onChange",
  });

  const { watch, setValue, getValues, formState: { errors, isValid } } = form;
  const eventos = watch("eventos");
  const anuenciaSus = watch("anuenciaSus");
  const tipoConcedente = watch("concedente.tipo");

  // Carregar rascunho ao montar
  useEffect(() => {
    const draft = loadDraft<EmendaFormData>();
    if (draft) {
      form.reset(draft);
      toast({
        title: "Rascunho recuperado",
        description: "Seus dados anteriores foram restaurados.",
      });
    }
  }, []);

  // Auto-save draft a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const values = getValues();
      if (values.numero || values.concedente.nome) {
        saveDraft(values);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const addEvento = () => {
    const current = getValues("eventos");
    setValue("eventos", [...current, createDefaultEvento()]);
  };

  const removeEvento = (index: number) => {
    const current = getValues("eventos");
    if (current.length > 1) {
      setValue("eventos", current.filter((_, i) => i !== index));
    }
  };

  const nextStep = async () => {
    // Validar campos do step atual antes de avançar
    let fieldsToValidate: (keyof EmendaFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["numero", "exercicio", "status"];
        break;
      case 2:
        fieldsToValidate = ["concedente"];
        break;
      case 3:
        fieldsToValidate = ["recebedor"];
        break;
      case 4:
        fieldsToValidate = ["objeto", "valorIndicado", "gestor", "anuenciaSus"];
        break;
    }

    const isStepValid = await form.trigger(fieldsToValidate as any);
    
    if (isStepValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    const values = getValues();
    saveDraft(values);
    toast({
      title: "Rascunho salvo",
      description: "Você pode continuar mais tarde.",
    });
  };

  const handleClear = () => {
    form.reset(defaultEmendaForm);
    clearDraft();
    setCurrentStep(1);
    toast({
      title: "Formulário limpo",
      description: "Todos os campos foram resetados.",
    });
  };

  const handleValidate = async () => {
    const isFormValid = await form.trigger();
    
    if (isFormValid) {
      toast({
        title: "Formulário válido",
        description: "Todos os campos estão preenchidos corretamente.",
      });
    } else {
      const errorCount = Object.keys(errors).length;
      toast({
        title: "Erros encontrados",
        description: `Existem ${errorCount} campo(s) com problemas. Verifique o formulário.`,
        variant: "destructive",
      });
    }
  };

  const handlePreview = async () => {
    const isFormValid = await form.trigger();
    if (isFormValid) {
      setShowPreview(true);
    } else {
      toast({
        title: "Formulário incompleto",
        description: "Preencha todos os campos obrigatórios antes de pré-visualizar.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: EmendaFormData) => {
    // Verificar se tem evento de disponibilização para publicar
    const temDisponibilizacao = data.eventos.some(e => e.tipo === "DISPONIBILIZAÇÃO" && e.data);
    
    if (data.status === "publicavel" && !temDisponibilizacao) {
      toast({
        title: "Não é possível publicar",
        description: "É obrigatório ter ao menos um evento de DISPONIBILIZAÇÃO para publicar.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createEmenda.mutateAsync({
        ...data,
        valorIndicado: data.valorIndicado,
      } as any);
      
      clearDraft();
      navigate("/admin");
    } catch (error) {
      // Error handled by mutation
    }
  };

  const formValues = watch();

  return (
    <BackofficeLayout title="Nova Emenda" subtitle="Cadastro de emenda parlamentar">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className={cn(
                        "wizard-step cursor-pointer",
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
                    </button>
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
                    <FormField
                      control={form.control}
                      name="numero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número da Emenda *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: 847/2024" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Formato: 000/0000</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="exercicio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exercício *</FormLabel>
                          <Select 
                            value={String(field.value)} 
                            onValueChange={(v) => field.onChange(Number(v))}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o ano" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {exerciciosDisponiveis.map((ano) => (
                                <SelectItem key={ano} value={String(ano)}>
                                  {ano}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="modalidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modalidade de Transferência</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a modalidade (opcional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {modalidadesTransferencia.map((m) => (
                              <SelectItem key={m.value} value={m.value}>
                                {m.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex gap-4"
                          >
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name="concedente.tipo"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Tipo de Concedente *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid grid-cols-2 gap-4"
                          >
                            {tiposConcedente.map((tipo) => (
                              <div 
                                key={tipo.value}
                                className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                              >
                                <RadioGroupItem value={tipo.value} id={tipo.value} />
                                <Label htmlFor={tipo.value} className="font-normal cursor-pointer flex-1">
                                  <span className="font-medium block">{tipo.label}</span>
                                  <span className="text-sm text-muted-foreground">{tipo.description}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="concedente.nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Concedente *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Dep. Maria Santos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {tipoConcedente === "outro" && (
                    <FormField
                      control={form.control}
                      name="concedente.descricaoOutro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição *</FormLabel>
                          <FormControl>
                            <Input placeholder="Especifique o tipo de concedente" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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
                  <FormField
                    control={form.control}
                    name="recebedor.tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Recebedor *</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tiposRecebedor.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="recebedor.nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome / Razão Social *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Prefeitura Municipal de Belo Horizonte" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recebedor.cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="00.000.000/0000-00" 
                              value={field.value}
                              onChange={(e) => field.onChange(maskCnpj(e.target.value))}
                              maxLength={18}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="grid gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="recebedor.municipio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Município *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Belo Horizonte" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recebedor.uf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UF *</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="UF" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MG">MG</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recebedor.codigoIbge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código IBGE *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: 3106200" 
                              value={field.value}
                              onChange={(e) => field.onChange(maskCodigoIbge(e.target.value))}
                              maxLength={7}
                            />
                          </FormControl>
                          <FormDescription>7 dígitos</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="objeto.tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo do Objeto *</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tiposObjeto.map((t) => (
                                <SelectItem key={t.value} value={t.value}>
                                  {t.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="objeto.gnd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GND *</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o GND" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {gndsDisponiveis.map((g) => (
                                <SelectItem key={g.value} value={g.value}>
                                  {g.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="objeto.descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do Objeto *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva detalhadamente o objeto da emenda..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Mínimo 10 caracteres</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="valorIndicado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor Indicado (R$) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0,00"
                              value={field.value ? maskCurrency(String(Math.round(field.value * 100))) : ""}
                              onChange={(e) => {
                                const value = unmaskCurrency(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gestor.nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gestor Responsável *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo do gestor" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="anuenciaSus"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Anuência SUS *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex gap-6"
                          >
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {anuenciaSus === "nao" && (
                    <FormField
                      control={form.control}
                      name="motivoSemAnuencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivo da não anuência *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Explique o motivo da não anuência do SUS..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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
                    <FormField
                      control={form.control}
                      name="contaBancaria.banco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banco</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o banco" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bancosDisponiveis.map((b) => (
                                <SelectItem key={b.value} value={b.value}>
                                  {b.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contaBancaria.agencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agência</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0000-0" 
                              value={field.value || ""}
                              onChange={(e) => field.onChange(maskAgencia(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contaBancaria.conta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conta Corrente</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="00000-0" 
                              value={field.value || ""}
                              onChange={(e) => field.onChange(maskConta(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      <Button type="button" variant="outline" size="sm" onClick={addEvento}>
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
                                  type="button"
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => removeEvento(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid gap-4 md:grid-cols-4">
                              <FormField
                                control={form.control}
                                name={`eventos.${index}.tipo`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {tiposEvento.map((t) => (
                                          <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`eventos.${index}.data`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Data *</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`eventos.${index}.valor`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Valor (R$)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="0,00"
                                        value={field.value ? maskCurrency(String(Math.round(field.value * 100))) : ""}
                                        onChange={(e) => {
                                          const value = unmaskCurrency(e.target.value);
                                          field.onChange(value || undefined);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`eventos.${index}.observacao`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Observação</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Opcional" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
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
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-t bg-muted/30">
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <Button 
                  type="button"
                  variant="ghost" 
                  onClick={handleClear}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={handleSaveDraft}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Rascunho
                </Button>

                <Button type="button" variant="outline" onClick={handleValidate}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Validar
                </Button>

                <Button type="button" variant="outline" onClick={handlePreview}>
                  <Eye className="h-4 w-4 mr-2" />
                  Pré-visualizar
                </Button>

                {currentStep < 5 ? (
                  <Button type="button" onClick={nextStep}>
                    Próximo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    variant="success"
                    disabled={createEmenda.isPending}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {createEmenda.isPending ? "Salvando..." : "Salvar e Publicar"}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </form>
      </FormProvider>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pré-visualização da Emenda</DialogTitle>
            <DialogDescription>
              Confira os dados antes de salvar
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Identificação */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Identificação
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Número:</span> {formValues.numero || "-"}</div>
                <div><span className="text-muted-foreground">Exercício:</span> {formValues.exercicio}</div>
                <div><span className="text-muted-foreground">Modalidade:</span> {modalidadesTransferencia.find(m => m.value === formValues.modalidade)?.label || "-"}</div>
                <div><span className="text-muted-foreground">Status:</span> <Badge variant={formValues.status === "publicavel" ? "success" : "muted"}>{formValues.status}</Badge></div>
              </div>
            </div>

            <Separator />

            {/* Concedente */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Concedente
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Tipo:</span> {tiposConcedente.find(t => t.value === formValues.concedente?.tipo)?.label || "-"}</div>
                <div><span className="text-muted-foreground">Nome:</span> {formValues.concedente?.nome || "-"}</div>
              </div>
            </div>

            <Separator />

            {/* Recebedor */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" /> Recebedor
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Nome:</span> {formValues.recebedor?.nome || "-"}</div>
                <div><span className="text-muted-foreground">CNPJ:</span> {formValues.recebedor?.cnpj || "-"}</div>
                <div><span className="text-muted-foreground">Município:</span> {formValues.recebedor?.municipio || "-"}</div>
                <div><span className="text-muted-foreground">Código IBGE:</span> {formValues.recebedor?.codigoIbge || "-"}</div>
              </div>
            </div>

            <Separator />

            {/* Objeto */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" /> Objeto
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <Badge>{tiposObjeto.find(t => t.value === formValues.objeto?.tipo)?.label || "-"}</Badge>
                  <Badge variant="outline">{gndsDisponiveis.find(g => g.value === formValues.objeto?.gnd)?.label || "-"}</Badge>
                </div>
                <div><span className="text-muted-foreground">Descrição:</span> {formValues.objeto?.descricao || "-"}</div>
                <div><span className="text-muted-foreground">Valor:</span> <strong>{formatCurrency(formValues.valorIndicado || 0)}</strong></div>
                <div><span className="text-muted-foreground">Gestor:</span> {formValues.gestor?.nome || "-"}</div>
              </div>
            </div>

            <Separator />

            {/* Eventos */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Landmark className="h-4 w-4" /> Eventos Financeiros
              </h4>
              <div className="space-y-2">
                {formValues.eventos?.map((e, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm p-2 bg-muted/50 rounded">
                    <Badge variant={e.tipo === "DISPONIBILIZAÇÃO" ? "success" : "muted"}>{e.tipo}</Badge>
                    <span>{e.data || "-"}</span>
                    {e.valor && <span className="font-medium">{formatCurrency(e.valor)}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </BackofficeLayout>
  );
}
