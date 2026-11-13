import { useState } from 'react';
import { ArrowRight, BarChart3, MessageCircle } from 'lucide-react';
import heroStrategyImg from '../assets/images/hero_marketing_strategy_1794592393009.jpg';
import { trackClickWhatsapp } from '../utils/tracking';
import { getDirectWhatsappUrl } from '../utils/whatsapp';

export function HeroSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="inicio"
      className="relative bg-white border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle architectural background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(38,117,216,0.06),_transparent_55%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Headline, Value Proposition, Primary & Secondary CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-[#2675D8] tracking-wide mb-4">
              AG Alves – Consultoria e Marketing
              <span aria-hidden="true" className="mx-2 text-slate-300">
                ·
              </span>
              Atendimento em todo o Brasil
            </p>

            <h1 className="font-display font-bold text-[#102B50] tracking-tight leading-[1.1] text-balance text-[clamp(2rem,4vw,3.5rem)] max-w-2xl">
              Sua empresa pode conquistar mais clientes com uma estratégia digital bem planejada.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#334155] leading-relaxed max-w-xl">
              A AG Alves ajuda pequenas e médias empresas a fortalecer sua presença digital, alcançar
              o público certo e gerar novas oportunidades comerciais através do marketing estratégico.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
              <a
                href="#diagnostico"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-white bg-[#2675D8] hover:bg-[#1E60B5] rounded-lg shadow-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2675D8]"
              >
                <span>SOLICITAR DIAGNÓSTICO GRATUITO</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={getDirectWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClickWhatsapp('hero_especialista')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-[#102B50] bg-white hover:bg-[#F1F5F9] border border-[#102B50]/20 rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#102B50]"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-[#2675D8]" aria-hidden="true" />
                <span>FALAR COM UM ESPECIALISTA</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Craft Visual Composition */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-[#102B50] min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]">
              {!imgError ? (
                <img
                  src={heroStrategyImg}
                  alt="Ambiente de consultoria em marketing estratégico com análise de funil e indicadores digitais"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#102B50] to-[#1a3e70] text-white">
                  <BarChart3 className="w-12 h-12 text-[#2675D8] mb-3" aria-hidden="true" />
                  <p className="font-display font-semibold text-lg">
                    Estratégia Digital &amp; Análise de Dados
                  </p>
                  <p className="text-sm text-slate-300 mt-1 max-w-xs">
                    Planejamento de aquisição e mensuração para pequenas e médias empresas.
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102B50]/35 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Structural Pillars Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h2 className="font-display font-semibold text-sm text-[#102B50]">
              Planejamento sob medida
            </h2>
            <p className="mt-1.5 text-sm text-[#334155] leading-relaxed">
              Estratégias estruturadas de acordo com os produtos, serviços e a realidade comercial de
              cada empresa.
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold text-sm text-[#102B50]">
              Decisões orientadas a dados
            </h2>
            <p className="mt-1.5 text-sm text-[#334155] leading-relaxed">
              Acompanhamento de métricas, conversões e contatos para otimizar cada investimento em
              mídia.
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold text-sm text-[#102B50]">
              Atendimento online nacional
            </h2>
            <p className="mt-1.5 text-sm text-[#334155] leading-relaxed">
              Consultoria próxima e objetiva para pequenas e médias empresas em todo o território
              brasileiro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
