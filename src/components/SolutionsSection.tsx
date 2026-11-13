import { useState } from 'react';
import {
  Activity,
  BarChart2,
  Compass,
  Globe,
  Megaphone,
  Search,
  UserPlus,
} from 'lucide-react';
import consultingImg from '../assets/images/consulting_data_strategy_1794592393636.jpg';
import { SOLUTIONS } from '../data/content';

const SOLUTION_ICONS: Record<string, typeof Search> = {
  'google-ads': Search,
  'meta-ads': Megaphone,
  'geracao-leads': UserPlus,
  'marketing-estrategico': Compass,
  'presenca-digital': Globe,
  'mensuracao-otimizacao': Activity,
};

export function SolutionsSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="solucoes" className="bg-white py-16 sm:py-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Asymmetric Split: Heading + Consulting Strategy Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2675D8]">
              Nossas soluções
            </p>
            <h2 className="mt-2 font-display font-bold text-[#102B50] text-[clamp(1.625rem,3vw,2.375rem)] leading-tight tracking-tight text-balance max-w-2xl">
              Estratégias digitais para conectar sua empresa aos clientes certos.
            </h2>
            <p className="mt-4 text-base text-[#334155] leading-relaxed max-w-xl">
              Combinamos canais de aquisição, posicionamento digital e acompanhamento contínuo de
              indicadores para estruturar oportunidades comerciais compatíveis com o momento do seu
              negócio.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#F1F5F9] aspect-[4/3]">
              {!imgError ? (
                <img
                  src={consultingImg}
                  alt="Planejamento de estratégia digital e análise de métricas de desempenho"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#102B50]">
                  <BarChart2 className="w-10 h-10 text-[#2675D8] mb-2" aria-hidden="true" />
                  <p className="font-display font-semibold text-sm">
                    Planejamento e Mensuração Contínua
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6 Service Cards */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SOLUTIONS.map((solution) => {
            const Icon = SOLUTION_ICONS[solution.id] || Compass;
            return (
              <article
                key={solution.id}
                className="rounded-xl border border-slate-200 bg-[#F1F5F9]/45 p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150 hover:bg-white hover:border-[#2675D8]/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-xs font-medium text-[#2675D8]">
                      {solution.category}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#102B50] text-white flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#102B50]">
                    {solution.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#334155] leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
