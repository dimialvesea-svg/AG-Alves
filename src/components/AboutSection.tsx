import { useState } from 'react';
import { UserCheck } from 'lucide-react';

export function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="sobre" className="bg-white py-16 sm:py-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Founder Photography */}
          <div className="lg:col-span-5 flex justify-center lg:justify-stretch">
            <figure className="relative w-full max-w-md lg:max-w-none rounded-xl overflow-hidden border border-slate-200 bg-[#102B50] aspect-[3/4] lg:aspect-auto lg:min-h-[460px]">
              {!imgError ? (
                <img
                  src="/assets/aistudio/Foto_Edmilson01_b6f6f5de.png"
                  alt="Responsável pela AG Alves – Consultoria e Marketing"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F1F5F9]">
                  <div className="w-20 h-20 rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#102B50]">
                    <UserCheck className="w-8 h-8 text-[#2675D8]" aria-hidden="true" />
                  </div>
                  <p className="mt-4 font-display font-semibold text-base text-[#102B50]">
                    AG Alves – Consultoria e Marketing
                  </p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102B50]/85 via-[#102B50]/15 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                <p className="font-display font-semibold text-base tracking-tight">
                  AG Alves – Consultoria e Marketing
                </p>
                <p className="mt-0.5 text-xs text-slate-200">
                  Atendimento direto e consultivo · Brasil
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Right Column: Institutional Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2675D8]">
              Sobre a AG Alves
            </p>
            <h2 className="mt-2 font-display font-bold text-[#102B50] text-[clamp(1.625rem,3vw,2.375rem)] leading-tight tracking-tight text-balance">
              Marketing com estratégia, responsabilidade e foco em oportunidades.
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-[17px] text-[#334155] leading-relaxed">
              <p>
                A AG Alves – Consultoria e Marketing nasceu com o propósito de ajudar empresas a
                utilizarem o marketing digital de forma mais estratégica.
              </p>
              <p>
                Acreditamos que anunciar não significa simplesmente investir dinheiro em campanhas.
                É necessário compreender o negócio, conhecer o público, definir objetivos e
                acompanhar os resultados.
              </p>
              <p>
                Nosso trabalho é aproximar empresas de seus potenciais clientes, utilizando
                planejamento, tecnologia e estratégias de marketing digital.
              </p>
            </div>

            {/* Clean Prepared Slot for Verified Credentials */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-semibold text-sm text-[#102B50]">
                  Compromisso com transparência
                </h3>
                <p className="mt-1 text-sm text-[#334155] leading-relaxed">
                  Comunicação clara sobre investimentos, etapas de trabalho e métricas acompanhadas
                  em cada campanha.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-[#102B50]">
                  Atuação nacional online
                </h3>
                <p className="mt-1 text-sm text-[#334155] leading-relaxed">
                  Consultoria estruturada para pequenas e médias empresas de diferentes segmentos em
                  todo o Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
