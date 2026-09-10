import { useTranslation } from "react-i18next";
import { usePortaClara } from "@/components/providers/theme-provider";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

/**
 * A PORTA da família Inn — a casca de TODA tela de entrada do InnTask
 * (entrar, criar conta, conferir e-mail, aprovar dispositivo, autorizar MCP).
 *
 * Escrita pelo script de tema (`scripts/innagent-stack/aplicar-tema-kaneo.py`),
 * a partir de `scripts/innagent-stack/porta/ESPECIFICACAO.md`. Editar este
 * arquivo à mão não sobrevive à próxima subida de versão: mexa na spec e no
 * script.
 *
 * Duas colunas. A da esquerda é um CAMPO, não um enfeite colorido: é onde o
 * produto diz o que é, sobre a tinta profunda da família (#171A1F), com o
 * lockup no topo e três provas de uma linha marcadas por um filete de lima.
 * A da direita é o formulário do motor, nu sobre o branco — sem cartão, porque
 * o fundo branco já é o cartão e moldura dentro de moldura é ruído.
 *
 * Abaixo de 1024px vira uma coluna só: campo em cima, formulário embaixo.
 */
export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { t } = useTranslation();

  // Regra 3 da spec: a porta abre no CLARO, qualquer que seja a preferência
  // salva. O campo da esquerda já é escuro por desenho — abrir a tela inteira
  // no escuro quebra a leitura da família.
  usePortaClara();

  const provas = [
    t("auth:porta.prova1", { defaultValue: "Tasks by project, each with an owner and a due date" }),
    t("auth:porta.prova2", { defaultValue: "Housekeeping, maintenance and front desk in one place" }),
    t("auth:porta.prova3", { defaultValue: "The agents open and close tasks beside your team" }),
  ];

  return (
    <main className="flex h-svh w-full flex-col overflow-y-auto bg-[#FFFFFF] lg:flex-row">
      <section className="flex shrink-0 flex-col justify-center bg-[#171A1F] px-12 py-6 text-[#FFFFFF] lg:w-[46%] lg:px-16 lg:py-0">
        <div className="mx-auto flex w-full max-w-[33.375rem] flex-col gap-8">
          {/* Um lockup, no topo do campo — nunca no meio do formulário, nunca
              dois. O `logo-light` é o lockup tingido para fundo escuro. */}
          <img
            src="/logo-light.svg"
            alt="InnTask"
            className="h-9 w-auto self-start"
          />

          <h1 className="font-heading text-[1.75rem] leading-[1.15] font-bold text-balance lg:text-[2.75rem] lg:leading-[1.1]">
            {t("auth:porta.frase", { defaultValue: "Every job in the hotel, on one board." })}
          </h1>

          {/* A linha da prova é 24px EXATOS, nunca `1.5`: 15 × 1,5 = 22,5, e cada
              motor arredonda para um lado (este saía 23). */}
          <ul className="flex flex-col gap-4">
            {provas.map((prova) => (
              <li
                key={prova}
                className="flex items-start gap-4 text-[0.9375rem] leading-[24px] text-[#CCCFD1]"
              >
                {/* Filete de lima: é a marcação da lista. Nunca bolinha,
                    nunca ícone, nunca azul. */}
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] h-[3px] w-4 shrink-0 rounded-full bg-[#DAF06B]"
                />
                {prova}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex shrink-0 grow basis-auto items-center justify-center bg-[#FFFFFF] px-6 py-12 lg:px-16">
        <div className="w-full max-w-[28rem]">
          <h2 className="font-heading text-[1.375rem] leading-[1.2] font-semibold text-foreground">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-[0.9375rem] leading-[1.5] text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
          {children}
        </div>
      </section>
    </main>
  );
}
