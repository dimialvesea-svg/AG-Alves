import { ArrowRight, Instagram, MessageCircle, X } from 'lucide-react';
import { trackClickWhatsapp } from '../utils/tracking';
import {
  getDirectWhatsappUrl,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
} from '../utils/whatsapp';

interface FinalCtaAndFooterProps {
  privacyOpen: boolean;
  onOpenPrivacy: () => void;
  onClosePrivacy: () => void;
}

export function FinalCtaAndFooter({
  privacyOpen,
  onOpenPrivacy,
  onClosePrivacy,
}: FinalCtaAndFooterProps) {
  return (
    <>
      {/* Seção 8 — Chamada Final */}
      <section className="bg-[#102B50] text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-[clamp(1.75rem,3.4vw,2.625rem)] leading-tight tracking-tight text-balance">
            Seu próximo cliente pode estar procurando exatamente o que sua empresa oferece.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mx-auto">
            Vamos conversar sobre as oportunidades do seu negócio?
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#diagnostico"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-white bg-[#2675D8] hover:bg-[#1E60B5] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B50] focus-visible:ring-[#2675D8]"
            >
              <span>QUERO MEU DIAGNÓSTICO GRATUITO</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>

            <a
              href={getDirectWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClickWhatsapp('chamada_final')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B50] focus-visible:ring-white"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>FALAR NO WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* Seção 9 — Rodapé */}
      <footer className="bg-[#0B1E38] text-slate-300 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-5">
              <p className="font-display font-bold text-lg text-white">
                AG Alves – Consultoria e Marketing
              </p>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed max-w-sm">
                Estratégia, marketing digital e geração de oportunidades comerciais.
              </p>
              <p className="mt-3 text-xs font-medium text-[#60A5FA]">
                Atendimento online em todo o Brasil.
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">
                Navegação
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#desafios" className="hover:text-white transition-colors">
                    Desafios
                  </a>
                </li>
                <li>
                  <a href="#solucoes" className="hover:text-white transition-colors">
                    Nossas Soluções
                  </a>
                </li>
                <li>
                  <a href="#metodologia" className="hover:text-white transition-colors">
                    Metodologia
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-white transition-colors">
                    Sobre a AG Alves
                  </a>
                </li>
                <li>
                  <a href="#diagnostico" className="hover:text-white transition-colors">
                    Diagnóstico Gratuito
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">
                Contato e Canais
              </h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li>
                  <a
                    href={getDirectWhatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClickWhatsapp('footer')}
                    className="inline-flex items-center gap-2 text-white hover:text-[#60A5FA] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#2675D8] shrink-0" aria-hidden="true" />
                    <span className="tabular-nums">WhatsApp: {WHATSAPP_DISPLAY}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                    <span>Instagram: @edmilson_anuncios</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#diagnostico"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                  >
                    Solicitar contato por diagnóstico
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Política de Privacidade
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} AG Alves – Consultoria e Marketing.</p>
            <p>Atendimento online para empresas em todo o Brasil.</p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante de WhatsApp */}
      <a
        href={getDirectWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClickWhatsapp('floating_button')}
        aria-label="Falar com a AG Alves pelo WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 rounded-full bg-[#102B50] hover:bg-[#2675D8] text-white shadow-lg border border-white/15 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2675D8]"
      >
        <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
          Falar no WhatsApp
        </span>
      </a>

      {/* Modal de Política de Privacidade */}
      {privacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1E38]/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200">
              <h2
                id="privacy-modal-title"
                className="font-display font-bold text-lg text-[#102B50]"
              >
                Política de Privacidade – AG Alves
              </h2>
              <button
                type="button"
                onClick={onClosePrivacy}
                aria-label="Fechar Política de Privacidade"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#102B50] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#334155] leading-relaxed">
              <p>
                A <strong>AG Alves – Consultoria e Marketing</strong> respeita a sua privacidade e
                trata os dados informados nesta página em conformidade com a Lei Geral de Proteção
                de Dados Pessoais (Lei nº 13.709/2018 – LGPD).
              </p>

              <div>
                <h3 className="font-display font-semibold text-[#102B50]">
                  1. Finalidade da coleta de informações
                </h3>
                <p className="mt-1">
                  As informações preenchidas no formulário de Diagnóstico Estratégico Gratuito (nome,
                  empresa, WhatsApp, cidade/estado, segmento, desafios comerciais e status de
                  investimento em mídia) são utilizadas exclusivamente para compreender o contexto do
                  seu negócio e realizar o atendimento comercial solicitado por você.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#102B50]">
                  2. Forma de encaminhamento dos dados
                </h3>
                <p className="mt-1">
                  Esta página não armazena os dados do formulário em banco de dados próprio. Ao
                  confirmar o envio, as respostas são estruturadas em uma mensagem direcionada ao
                  WhatsApp comercial da AG Alves ({WHATSAPP_DISPLAY}) para que você conclua o contato
                  diretamente conosco.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#102B50]">
                  3. Mensuração e parâmetros de origem (UTM)
                </h3>
                <p className="mt-1">
                  Podemos registrar parâmetros técnicos de origem de visita (como UTM de campanhas) e
                  eventos de navegação para avaliar o desempenho das ações de divulgação da agência,
                  sempre respeitando os limites legais aplicáveis.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[#102B50]">
                  4. Compartilhamento e direitos do titular
                </h3>
                <p className="mt-1">
                  Seus dados não são vendidos ou compartilhados com terceiros alheios ao atendimento.
                  Você pode solicitar esclarecimentos, atualização ou exclusão de informações de
                  atendimento diretamente pelo nosso WhatsApp comercial ({WHATSAPP_DISPLAY}) ou
                  pelo Instagram oficial (@edmilson_anuncios).
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={onClosePrivacy}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#102B50] hover:bg-[#2675D8] rounded-lg transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
