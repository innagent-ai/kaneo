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
 * Decidido em 08/09/2026: símbolo 28×28 no topo-esquerda de todo motor, com o nome
 * ficando na aba e na tela de entrada. O lockup não serve ali — os apps limitam a
 * marca pela ALTURA e deixam a largura correr, então razão 5,2 vira faixa de 146px
 * num slot de 28px. Serve o mesmo ativo do favicon, que já é 121×120.
 */
export function Simbolo({ className = "" }: LogoProps) {
  return (
    <img
      src="/favicon.svg"
      alt="InnTask"
      width={28}
      height={28}
      className={`size-7 shrink-0 ${className}`}
    />
  );
}
