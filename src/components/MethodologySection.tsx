import { BarChart3 } from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/content';

export function MethodologySection() {
  return (
    <section
      id="metodologia"
      className="bg-[#102B50] text-white py-16 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
            Nossa metodologia
          </p>
          <h2 className="mt-2 font-display font-bold text-white text-[clamp(1.625rem,3vw,2.375rem)] leading-tight tracking-tight text-balance">
            Não começamos pelos anúncios. Começamos entendendo o seu negócio.
          </h2>
        </div>

        {/* 5-Stage Connected Progression */}
        <div className="mt-12 sm:mt-14 relative">
          {/* Desktop horizontal connector line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-6 right-6 h-px bg-white/15"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5 relative">
            {METHODOLOGY_STEPS.map((step) => (
              <li
                key={step.number}
                className="relative flex flex-col bg-[#153562] border border-white/10 rounded-xl p-6 transition-colors duration-150 hover:border-[#2675D8]/70"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#2675D8] text-white font-mono text-sm font-semibold tabular-nums shadow-sm">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                    Etapa {step.number}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base tracking-wide text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-200 leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Data-Driven Decision Highlight */}
        <div className="mt-10 sm:mt-12 rounded-xl border border-white/15 bg-[#0C2240] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-11 h-11 rounded-lg bg-[#2675D8]/20 border border-[#2675D8]/40 text-[#60A5FA] flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-base text-white">
              Decisões baseadas em dados, não em suposições
            </h3>
            <p className="mt-1 text-sm sm:text-base text-slate-200 leading-relaxed">
              Cada etapa gera informações reais sobre comportamento do público, custo por contato e
              conversões. É com base nesses indicadores que ajustamos campanhas, mensagens e canais
              para evoluir os resultados de forma consistente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
