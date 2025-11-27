"use client"
import Image from "next/image";
import Link from "next/link";
import { FeatureCard, FeatureCardProps } from "./components/FeatureCard";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { TextFlipHome } from "./components/TextFlipHome";
import { MovingBorderButton } from "./components/MovingBorderButton";
import { BackgroundLines } from "../components/ui/background-lines";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MultiStepLoader } from "../components/ui/multi-step-loader";
import { LinkPreview } from "../components/ui/link-preview";

const cards: FeatureCardProps[] = [
  {
    imageSrc:
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/526e7ebe-352e-420b-b2cc-c53b62f56150.png",
    imageAlt: "Diagramas de Venn",
    title: "Aprenda com diagramas de Venn",
    subtitle:
      "Compreenda visualmente a relação entre conjuntos através de círculos coloridos.",
    accentColor: "a",
  },
  {
    imageSrc:
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3a27ce89-c62f-4efc-8021-d634f710e83d.png",
    imageAlt: "Operações em ação",
    title: "Veja as operações em ação",
    subtitle:
      "Explore união, interseção, diferença e complemento de forma interativa.",
    accentColor: "b",
  },
  {
    imageSrc:
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b557d92e-9101-4aa3-80b4-1e4aaff3c397.png",
    imageAlt: "Laboratório de conjuntos",
    title: "Laboratório para praticar",
    subtitle:
      "Experimente criando e manipulando conjuntos com total liberdade.",
    accentColor: "c",
  },
  {
    imageSrc:
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/cd3050c5-1870-47ba-9849-b7e56b625122.png",
    imageAlt: "Ensino em sala",
    title: "Apoio para professores",
    subtitle:
      "Apresente conceitos dinamicamente e facilite o aprendizado colaborativo.",
    accentColor: "d",
  },
];

const loadingStates = [
  {
    text: "📚 Organizando seus conjuntos...",
  },
  {
    text: "🎨 Preparando os diagramas de Venn...",
  },
  {
    text: "⚡ Ativando as operações matemáticas...",
  },
  {
    text: "🔬 Calibrando o laboratório...",
  },
  {
    text: "✨ Abrindo as portas do Espaço Venn...",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLaboratorioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/laboratorio");
    }, 5000); // 5 segundos (5 estados x 1 segundos cada)
  };

  return (
    <main className="mx-auto flex flex-col items-center justify-between xl:max-w-7xl">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={1000}
        loop={true}
      />
      <section className="hero flex-center relative min-h-screen w-full border-b-10 border-gray-300 px-10">
        {/* BackgroundLines component */}
        <BackgroundLines className="absolute inset-0 top-15 z-0 sm:top-20 md:top-0 lg:top-10">
          <div />
        </BackgroundLines>

        {/* Conteúdo com z-index maior que o background */}
        <div className="flex-center relative z-10 pb-20">
          <Image
            src="/logomarca.svg"
            alt="Logomarca do Espaço Venn"
            width={350}
            height={350}
            className="pb-10"
          />
          <div className="flex-center gap-2 text-center">
            <TextFlipHome
              title="Bem vindo ao"
              subtitle="Aprenda teoria dos conjuntos de forma visual e interativa"
            />
          </div>
          <a
            onClick={handleLaboratorioClick}
            href="/laboratorio"
            className="pt-15 cursor-pointer"
            aria-label="Acessar laboratório de conjuntos"
          >
            <MovingBorderButton text="Acessar Laboratório" />
          </a>
        </div>
      </section>

      <section className="flex-center mt-10 w-full p-10">
        <div className="flex w-full flex-col items-center  justify-center gap-2 text-center lg:flex-row">
          <h2 className="text-center text-3xl">O que é o Espaço Venn?</h2>
          <p className="max-w-2xl">
            Tudo que você precisa para reforçar seu conhecimento em teoria dos
            conjuntos.
          </p>
        </div>
        {/* CARD INFORMATIVOS */}
        <div className="grid gap-5 pt-10 sm:grid-cols-2">
          {cards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </section>
      <footer className="flex w-full items-center justify-between border-t-2 border-gray-300 p-5 text-sm">
        <p>© 2024 Espaço Venn. Todos os direitos reservados.</p>
        <LinkPreview
        quality={100}
          url="https://github.com/gustavuhh1/venn-lab"
          aria-label="Abrir repositório do Espaço Venn no GitHub"
          className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-800"
        >
          <GithubLogoIcon size={24} weight="regular" />
          <span className="hidden sm:inline">Repositório no GitHub</span>
        </LinkPreview>
      </footer>
    </main>
  );
}
