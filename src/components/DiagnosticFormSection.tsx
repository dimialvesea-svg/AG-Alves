import { FormEvent, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Edit3,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { AD_STATUS_OPTIONS, CHALLENGE_OPTIONS } from '../data/content';
import {
  captureAndGetAttribution,
  trackClickWhatsapp,
  trackFormStart,
  trackFormSubmit,
  trackGenerateLead,
} from '../utils/tracking';
import {
  buildDiagnosticMessage,
  buildDiagnosticWhatsappUrl,
  DiagnosticFormData,
  formatBrazilianPhone,
  getDirectWhatsappUrl,
  isValidBrazilianPhone,
} from '../utils/whatsapp';

interface DiagnosticFormSectionProps {
  onOpenPrivacy: () => void;
}

type FormErrors = Partial<Record<keyof DiagnosticFormData, string>>;

const INITIAL_DATA: DiagnosticFormData = {
  fullName: '',
  companyName: '',
  whatsapp: '',
  cityState: '',
  segment: '',
  mainChallenge: '',
  adStatus: '',
  additionalInfo: '',
  consent: false,
};

export function DiagnosticFormSection({ onOpenPrivacy }: DiagnosticFormSectionProps) {
  const [formData, setFormData] = useState<DiagnosticFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string | null>(null);
  const [submittedMessagePreview, setSubmittedMessagePreview] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const formStartedRef = useRef(false);
  const hiddenWhatsappLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleFirstInteraction = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFormStart();
    }
  };

  const updateField = <K extends keyof DiagnosticFormData>(
    field: K,
    value: DiagnosticFormData[K],
  ) => {
    handleFirstInteraction();
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Informe seu nome completo.';
    }
    if (!formData.companyName.trim()) {
      nextErrors.companyName = 'Informe o nome da sua empresa.';
    }
    if (!isValidBrazilianPhone(formData.whatsapp)) {
      nextErrors.whatsapp = 'Informe um WhatsApp válido com DDD (ex: (27) 98852-4978).';
    }
    if (!formData.cityState.trim()) {
      nextErrors.cityState = 'Informe sua cidade e estado (ex: Vitória - ES).';
    }
    if (!formData.segment.trim()) {
      nextErrors.segment = 'Informe o segmento de atuação da empresa.';
    }
    if (!formData.mainChallenge) {
      nextErrors.mainChallenge = 'Selecione o principal desafio da sua empresa.';
    }
    if (!formData.adStatus) {
      nextErrors.adStatus = 'Informe se sua empresa já investe em anúncios.';
    }
    if (!formData.consent) {
      nextErrors.consent = 'É necessário autorizar o contato para prosseguir.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const attribution = captureAndGetAttribution();
    const whatsappUrl = buildDiagnosticWhatsappUrl(formData, attribution);
    const previewMessage = buildDiagnosticMessage(formData, attribution);

    trackFormSubmit(formData.mainChallenge, formData.adStatus);
    trackGenerateLead(formData.mainChallenge, formData.adStatus);

    setSubmittedWhatsappUrl(whatsappUrl);
    setSubmittedMessagePreview(previewMessage);
    setCopied(false);

    // Trigger anchor navigation to WhatsApp cleanly without window.open
    requestAnimationFrame(() => {
      if (hiddenWhatsappLinkRef.current) {
        hiddenWhatsappLinkRef.current.href = whatsappUrl;
        hiddenWhatsappLinkRef.current.click();
      }
    });
  };

  const handleCopyMessage = async () => {
    if (!submittedMessagePreview) return;
    try {
      await navigator.clipboard.writeText(submittedMessagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="diagnostico" className="bg-[#F1F5F9] py-16 sm:py-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Context & Guidance */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2675D8]">
              Diagnóstico estratégico gratuito
            </p>
            <h2 className="mt-2 font-display font-bold text-[#102B50] text-[clamp(1.625rem,3vw,2.375rem)] leading-tight tracking-tight text-balance">
              Vamos analisar as oportunidades de crescimento da sua empresa?
            </h2>
            <p className="mt-4 text-base text-[#334155] leading-relaxed">
              Responda algumas perguntas e dê o primeiro passo para desenvolver uma estratégia de
              marketing mais eficiente para seu negócio.
            </p>

            <div className="mt-8 space-y-5 pt-6 border-t border-slate-300/70">
              <div>
                <h3 className="font-display font-semibold text-sm text-[#102B50]">
                  Como funciona após o preenchimento
                </h3>
                <p className="mt-1 text-sm text-[#334155] leading-relaxed">
                  Suas respostas são organizadas automaticamente em uma mensagem pronta para envio
                  direto no nosso WhatsApp comercial, sem etapas burocráticas.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-sm text-[#102B50]">
                  Sem compromisso de contratação
                </h3>
                <p className="mt-1 text-sm text-[#334155] leading-relaxed">
                  O diagnóstico inicial serve para compreender seu momento atual, identificar
                  oportunidades e avaliar os canais mais adequados para sua empresa.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={getDirectWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClickWhatsapp('secao_diagnostico_direto')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B50] hover:text-[#2675D8] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#2675D8]" aria-hidden="true" />
                  <span>Prefere conversar antes? Fale direto no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Conversion Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10">
              {/* Hidden anchor for automatic WhatsApp handoff on valid submit */}
              <a
                ref={hiddenWhatsappLinkRef}
                href="#diagnostico"
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              >
                Abrir WhatsApp
              </a>

              {submittedWhatsappUrl ? (
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#2675D8]/10 text-[#2675D8] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-[#102B50]">
                        Diagnóstico pronto para envio no WhatsApp
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-base text-[#334155] leading-relaxed">
                        Organizamos suas respostas abaixo. Caso a janela do WhatsApp não tenha sido
                        aberta automaticamente, clique no botão azul para abrir a conversa com a
                        mensagem já preenchida e toque em <strong>Enviar</strong> no WhatsApp para
                        concluir seu atendimento.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={submittedWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClickWhatsapp('diagnostico_concluir_envio')}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-white bg-[#2675D8] hover:bg-[#1E60B5] rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2675D8]"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>ABRIR WHATSAPP E CONCLUIR ENVIO</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-semibold text-[#102B50] bg-[#F1F5F9] hover:bg-slate-200/80 rounded-lg transition-colors duration-150"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#2675D8]" aria-hidden="true" />
                          <span>Mensagem copiada</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copiar mensagem</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-[#F1F5F9]/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Resumo preparado para o WhatsApp
                    </p>
                    <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {submittedMessagePreview}
                    </pre>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmittedWhatsappUrl(null)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#334155] hover:text-[#102B50] transition-colors"
                  >
                    <Edit3 className="w-4 h-4" aria-hidden="true" />
                    <span>Voltar e editar respostas</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* 1. Nome completo */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-[#102B50] mb-1.5"
                      >
                        Nome completo <span className="text-[#2675D8]">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onFocus={handleFirstInteraction}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Seu nome completo"
                        aria-invalid={Boolean(errors.fullName)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#102B50] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2675D8]/25 transition-colors ${
                          errors.fullName
                            ? 'border-red-600 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#2675D8]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Nome da empresa */}
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-[#102B50] mb-1.5"
                      >
                        Nome da empresa <span className="text-[#2675D8]">*</span>
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="organization"
                        required
                        value={formData.companyName}
                        onFocus={handleFirstInteraction}
                        onChange={(e) => updateField('companyName', e.target.value)}
                        placeholder="Nome do seu negócio"
                        aria-invalid={Boolean(errors.companyName)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#102B50] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2675D8]/25 transition-colors ${
                          errors.companyName
                            ? 'border-red-600 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#2675D8]'
                        }`}
                      />
                      {errors.companyName && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.companyName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* 3. WhatsApp com DDD */}
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-medium text-[#102B50] mb-1.5"
                      >
                        WhatsApp com DDD <span className="text-[#2675D8]">*</span>
                      </label>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        required
                        value={formData.whatsapp}
                        onFocus={handleFirstInteraction}
                        onChange={(e) =>
                          updateField('whatsapp', formatBrazilianPhone(e.target.value))
                        }
                        placeholder="(27) 99999-9999"
                        aria-invalid={Boolean(errors.whatsapp)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#102B50] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2675D8]/25 transition-colors ${
                          errors.whatsapp
                            ? 'border-red-600 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#2675D8]'
                        }`}
                      />
                      {errors.whatsapp && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.whatsapp}</span>
                        </p>
                      )}
                    </div>

                    {/* 4. Cidade e estado */}
                    <div>
                      <label
                        htmlFor="cityState"
                        className="block text-sm font-medium text-[#102B50] mb-1.5"
                      >
                        Cidade e estado <span className="text-[#2675D8]">*</span>
                      </label>
                      <input
                        id="cityState"
                        name="cityState"
                        type="text"
                        required
                        value={formData.cityState}
                        onFocus={handleFirstInteraction}
                        onChange={(e) => updateField('cityState', e.target.value)}
                        placeholder="Ex: Vitória - ES"
                        aria-invalid={Boolean(errors.cityState)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#102B50] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2675D8]/25 transition-colors ${
                          errors.cityState
                            ? 'border-red-600 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#2675D8]'
                        }`}
                      />
                      {errors.cityState && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.cityState}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 5. Segmento de atuação */}
                  <div>
                    <label
                      htmlFor="segment"
                      className="block text-sm font-medium text-[#102B50] mb-1.5"
                    >
                      Segmento de atuação <span className="text-[#2675D8]">*</span>
                    </label>
                    <input
                      id="segment"
                      name="segment"
                      type="text"
                      required
                      value={formData.segment}
                      onFocus={handleFirstInteraction}
                      onChange={(e) => updateField('segment', e.target.value)}
                      placeholder="Ex: Clínica odontológica, serviços B2B, comércio local, engenharia..."
                      aria-invalid={Boolean(errors.segment)}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#102B50] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2675D8]/25 transition-colors ${
                        errors.segment
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-slate-300 focus:border-[#2675D8]'
                      }`}
                    />
                    {errors.segment && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.segment}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* 6. Principal desafio */}
                    <div>
                      <label
                        htmlFor="mainChallenge"
                        className="block text-sm font-medium text-[#102B50] mb-1.5"
                      >
                        Qual é o principal desafio da sua empresa?{' '}
                        <span className="text-[#2675D8]">*</span>
                      </label>
                      <select
                        id="mainChallenge"
                        name="mainChallenge"
                        required
                        value={formData.mainChallenge}
                        onFocus={handleFirstInteraction}
                        onChange={(e) => updateField('mainChallenge', e.target.value)}
                        aria-invalid={Boolean(errors.mainChallenge)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2675D8]/25 transition-colors ${
                          formData.mainChallenge ? 'text-[#102B50]' : 'text-slate-500'
                        } ${
                          errors.mainChallenge
                            ? 'border-red-600 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#2675D8]'
                        }`}
                      >
                        <option value="">Selecione uma opção</option>
                        {CHALLENGE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.mainChallenge && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.mainChallenge}</span>
                        </p>
                      )}
                    </div>

                    {/* 7. Investimento em anúncios */}
                    <div>
                      <label
                        htmlFor="adStatus"
                        className="block text-sm font-medium text-[#102B50] mb-1.5"
                      >
                        Sua empresa já investe em anúncios?{' '}
                        <span className="text-[#2675D8]">*</span>
                      </label>
                      <select
                        id="adStatus"
                        name="adStatus"
                        required
                        value={formData.adStatus}
                        onFocus={handleFirstInteraction}
                        onChange={(e) => updateField('adStatus', e.target.value)}
                        aria-invalid={Boolean(errors.adStatus)}
                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2675D8]/25 transition-colors ${
                          formData.adStatus ? 'text-[#102B50]' : 'text-slate-500'
                        } ${
                          errors.adStatus
                            ? 'border-red-600 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#2675D8]'
                        }`}
                      >
                        <option value="">Selecione uma opção</option>
                        {AD_STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.adStatus && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.adStatus}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 8. Informações adicionais (opcional) */}
                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-[#102B50] mb-1.5"
                    >
                      Informações adicionais <span className="text-slate-400 font-normal">(opcional)</span>
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={3}
                      value={formData.additionalInfo}
                      onFocus={handleFirstInteraction}
                      onChange={(e) => updateField('additionalInfo', e.target.value)}
                      placeholder="Se desejar, conte brevemente sobre seus produtos, serviços ou objetivos."
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-[#102B50] bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#2675D8] focus:ring-2 focus:ring-[#2675D8]/25 transition-colors resize-y"
                    />
                  </div>

                  {/* Consentimento LGPD */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={formData.consent}
                        onFocus={handleFirstInteraction}
                        onChange={(e) => updateField('consent', e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2675D8] focus:ring-[#2675D8] shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                        Autorizo o contato da AG Alves para tratar da minha solicitação e concordo
                        com o uso dos meus dados para essa finalidade, conforme a{' '}
                        <button
                          type="button"
                          onClick={onOpenPrivacy}
                          className="font-semibold text-[#102B50] underline underline-offset-2 hover:text-[#2675D8]"
                        >
                          Política de Privacidade
                        </button>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-white bg-[#2675D8] hover:bg-[#1E60B5] rounded-lg shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2675D8] cursor-pointer"
                  >
                    <span>ENVIAR MEU DIAGNÓSTICO</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
                    <ShieldCheck className="w-4 h-4 text-[#2675D8] shrink-0" aria-hidden="true" />
                    <span>
                      Ao enviar, suas respostas serão encaminhadas diretamente ao WhatsApp comercial
                      da AG Alves.
                    </span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
