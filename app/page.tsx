import Image from "next/image";
import Link from "next/link";
import { FeatureCard, FeatureCardProps } from "./components/FeatureCard";
import { FlaskIcon, IntersectThreeIcon } from "@phosphor-icons/react/ssr";

const cards: FeatureCardProps[] = [
  {
    imageSrc: "https://picsum.photos/seed/15/360/230",
    imageAlt: "Diagramas de Venn",
    title: "Aprenda com diagramas de Venn",
    subtitle:
      "Visualize conjuntos e regiões coloridas para entender união e interseção.",
    accentColor: "a",
  },
  {
    imageSrc: "https://picsum.photos/seed/25/360/230?2",
    imageAlt: "Operações em ação",
    title: "Veja as operações em ação",
    subtitle:
      "Aplique união, interseção, diferença e complemento com um clique.",
    accentColor: "b",
  },
  {
    imageSrc: "https://picsum.photos/seed/35/360/230?3",
    imageAlt: "Laboratório de conjuntos",
    title: "Laboratório para praticar",
    subtitle:
      "Crie conjuntos, adicione elementos e teste exemplos do seu jeito.",
    accentColor: "c",
  },
  {
    imageSrc: "https://picsum.photos/seed/45/360/230?4",
    imageAlt: "Ensino em sala",
    title: "Apoio para professores",
    subtitle:
      "Demonstre conceitos ao vivo e deixe os alunos explorarem depois.",
    accentColor: "d",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-between xl:max-w-7xl">
      <section className="hero flex-center min-h-screen w-full border-b-10 border-gray-300 px-10">
        <div className="flex-center pb-20">
          {/* TODO: Mudar imagem */}
          <Image
            src="/logomarca.svg"
            alt="Description"
            width={350}
            height={350}
            className="pb-10"
          />
          {/* TODO: Adicionar animação de texto
          OPÇÕES:
          https://ui.aceternity.com/components/layout-text-flip 
          */}
          <div className="flex-center gap-2">
            <h1 className="text-6xl font-bold">Espaço Venn</h1>
            <p>Aprenda teoria dos conjuntos de forma visual e interativa</p>
          </div>
          {/* TODO: Adicionar carregamento da página com animação
          OPÇÕES:
          https://ui.aceternity.com/components/multi-step-loader
          */}
          <Link href="/laboratorio" className="pt-15">
            {/* TODO: Adicionar animação de botão
          OPÇÕES:
          https://ui.aceternity.com/components/moving-border
          https://ui.aceternity.com/components/hover-border-gradient
          */}
            <button type="button" className="btn-primary gap-2">
              Acessar Laboratório{" "}
              <IntersectThreeIcon size={20} weight="duotone" />
            </button>
          </Link>
        </div>
      </section>

      <section className="flex-center mt-10 w-full p-10">
        <div className="flex-center w-full flex-row gap-2 text-center sm:flex-col">
          <h2 className="text-center text-3xl">Oque é o Espaço Venn?</h2>
          <p className="max-w-2xl ">
            Tudo que você precisar para reforçar seu conhecimento em teoria dos
            conjuntos
          </p>
        </div>
        {/* CARD INFORMATIVOS */}
        <div className="grid gap-5 pt-10 sm:grid-cols-2">
          {cards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </section>
      <footer className="flex-center w-full border-t-2 border-gray-300 p-5">
        <p>© 2024 Espaço Venn. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
