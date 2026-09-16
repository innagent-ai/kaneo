import { useEffect, useLayoutEffect } from "react";
import { useUserPreferencesStore } from "@/store/user-preferences";

type Theme = "light" | "dark" | "system";

/** A única mão que escreve o tema no <html>. */
function aplicarTema(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme,
  );
}

/**
 * A PORTA ABRE NO CLARO, qualquer que seja a preferência salva — regra 3 da
 * spec da porta (`scripts/innagent-stack/porta/ESPECIFICACAO.md` no repo da
 * stack). O campo da esquerda já é escuro por desenho; abrir a tela inteira no
 * escuro, como este motor fazia, quebra a leitura da família Inn.
 *
 * `useLayoutEffect` de propósito: efeito de FILHO corre antes do `useEffect` do
 * provider, que é o pai, e antes da pintura — sem piscar escuro. E a marca
 * `data-porta` no <html> é o que impede o provider de repintar por cima; é o
 * mesmo gancho que o CSS da porta usa como escopo.
 *
 * Sai da porta (login feito) → o `data-porta` cai e o tema salvo volta.
 * Escrito pelo script de tema; editar à mão não sobrevive à próxima versão.
 */
export function usePortaClara() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-porta", "");
    aplicarTema("light");
    return () => {
      document.documentElement.removeAttribute("data-porta");
      aplicarTema(useUserPreferencesStore.getState().theme);
    };
  }, []);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useUserPreferencesStore();

  useEffect(() => {
    const naPorta = () => document.documentElement.hasAttribute("data-porta");
    if (!naPorta()) {
      aplicarTema(theme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system" && !naPorta()) {
        aplicarTema("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return <>{children}</>;
}
