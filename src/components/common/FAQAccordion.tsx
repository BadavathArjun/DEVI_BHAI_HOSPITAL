import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ } from '../../types';

interface FAQAccordionProps {
  faqs: FAQ[];
  defaultOpenIndex?: number;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, defaultOpenIndex = 0 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.id}
            className="medical-card overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left py-3.5 sm:py-4 px-4 sm:px-6 flex items-center justify-between space-x-3 sm:space-x-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl min-h-[48px]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              id={`faq-question-${faq.id}`}
            >
              <div className="flex items-start space-x-2.5 sm:space-x-3 min-w-0">
                <HelpCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="font-heading font-semibold text-navy-900 text-sm sm:text-lg">
                  {faq.question}
                </span>
              </div>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-teal-50 text-teal-700' : 'text-slate-500'}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${faq.id}`}
                role="region"
                aria-labelledby={`faq-question-${faq.id}`}
                className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
