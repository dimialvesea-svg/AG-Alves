import { ArrowRight, Compass, Globe, LineChart, Share2, Target, Users } from 'lucide-react';
import { PROBLEMS } from '../data/content';

const PROBLEM_ICONS = [Users, LineChart, Globe, Share2, Target, Compass];

export function ProblemsSection() {
  return (
    <section id="desafios" className="bg-[#F1F5F9] py-16 sm:py-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2675D8]">
            Identificação dos desafios
          </p>
          <h2 className="mt-2 font-display font-bold text-[#102B50] text-[clamp(1.625rem,3vw,2.375rem)] leading-tight tracking-tight text-balance">
            Sua empresa enfrenta algum desses desafios?
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROBLEMS.map((problem, index) => {
            const Icon = PROBLEM_ICONS[index] || Target;
            return (
              <article
                key={problem.number}
                className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150 hover:border-[#2675D8]/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="font-mono text-xs font-semibold text-[#2675D8] tabular-nums">
                      {problem.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] text-[#102B50] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-[#102B50] leading-snug">
                    {problem.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#334155] leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Connection Statement & Strategic CTA */}
        <div className="mt-10 sm:mt-12 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <p className="text-base sm:text-lg font-medium text-[#102B50] leading-relaxed max-w-3xl">
            Cada empresa possui uma realidade diferente. Por isso, antes de anunciar, é fundamental
            entender o negócio, identificar oportunidades e definir uma estratégia.
          </p>
          <a
            href="#diagnostico"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#2675D8] hover:bg-[#1E60B5] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2675D8]"
          >
            <span>QUERO ANALISAR MINHA EMPRESA</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
