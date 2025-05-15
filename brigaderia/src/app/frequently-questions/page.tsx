"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Com quantos dias de antecedência devo fazer o meu pedido?",
    answer:
      "Para brigadeiros de 20gr(aprox.), os pedidos deverão ser feitos com um mínimo de 2 dias de antecedência. Para brigadeiros de festa (15gr aprox.), no mínimo 5 dias de antecedência.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Pode efetuar o pagamento por <b>Transferência Bancária</b> ou <b>MB Way</b>. No momento de fechar a compra você encontrará todas as instruções.",
  },
  {
    question: "Onde levanto a minha encomenda?",
    answer:
      "Pode levantar a encomenda no nosso endereço: <b>Rua Cidade de Castelo Branco, 3, 8o Esquerdo, 2735-563 - Agualva-Cacém - Sintra</b>",
  },
  {
    question: "Fazem entregas?",
    answer: "No momento não.",
  },
  {
    question: "É possível fazer devolução do produto?",
    answer:
      "Se tratando de alimentos, infelizmente não temos como aceitar devolução.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border border-[#E0D5CF] rounded-xl overflow-hidden bg-[#F9F6F4]"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-[#96654A] hover:bg-[#F3ECE9] cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-content-${index}`}
              id={`faq-header-${index}`}
            >
              {faq.question}
              <ChevronDown
                className={`h-5 w-5 text-[#96654A] transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Container animado */}
            <div
              id={`faq-content-${index}`}
              role="region"
              aria-labelledby={`faq-header-${index}`}
              ref={(el) => void (contentRefs.current[index] = el)}
              className="px-4 overflow-hidden text-[#5C4638] bg-[#96654A10] border-t border-[#E0D5CF] transition-[max-height,opacity] duration-300 ease-in-out"
              style={{
                maxHeight: isOpen
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div
                className="py-4"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
