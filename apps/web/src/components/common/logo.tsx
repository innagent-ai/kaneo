import { Link } from "@tanstack/react-router";
import useProjectStore from "@/store/project";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  const { setProject } = useProjectStore();

  return (
    <Link
      onClick={() => {
        setProject(undefined);
      }}
      to="/dashboard"
      className={`w-auto ${className}`}
    >
      <img
        src="/logo-dark.svg"
        alt="InnTask"
        className="h-6 w-auto dark:hidden"
      />
      <img
        src="/logo-light.svg"
        alt="InnTask"
        className="hidden h-6 w-auto dark:block"
      />
    </Link>
  );
}

/**
 * O símbolo 1:1 do canto superior esquerdo — o padrão da família Inn.
 *
 * Decidido em 08/09/2026: símbolo 1:1 no topo-esquerda de todo motor, com o nome
 * ficando na aba e na tela de entrada. O lockup não serve ali — os apps limitam a
 * marca pela ALTURA e deixam a largura correr, então razão 5,2 vira faixa de 146px
 * num slot pequeno. Serve o mesmo ativo do favicon, que já é 121×120.
 *
 * 📏 15/09/2026: a medida caiu de 28 para 16 — martelo do Vini ("que todos tenham e
 * sigam o mesmo tamanho do chatwoot/innchat, pequeno e discreto"). A régua da família
 * passou a ser o InnChat, medido na tela em 16×16; era o único em 16 e virou o padrão.
 */
export function Simbolo({ className = "" }: LogoProps) {
  return (
    <img
      src="/favicon.svg"
      alt="InnTask"
      width={16}
      height={16}
      className={`size-4 shrink-0 ${className}`}
    />
  );
}
