import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/content';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="duvidas" className="bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center max-w-2xl sm:mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2675D8]">
            Perguntas frequentes
          </p>
          <h2 className="mt-2 font-display font-bold text-[#102B50] text-[clamp(1.625rem,3vw,2.25rem)] leading-tight tracking-tight text-balance">
            Dúvidas comuns antes de solicitar seu diagnóstico
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={faq.question} className="py-1">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2675D8] rounded-md cursor-pointer"
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-[#102B50] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#2675D8] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-5 pr-8 text-sm sm:text-base text-[#334155] leading-relaxed"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
