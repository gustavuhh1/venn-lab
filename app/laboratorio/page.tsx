"use client";

import Image from "next/image";
import Link from "next/link";
import { VennViewer } from "./components/VennViewer";
import { DiagramaControls } from "./components/VennControls";
import { useState } from "react";
import { ConjuntoId, Conjuntos } from "@/types/laboratorios";
import { VennConjOperations } from "./components/VennConjOperations";
import { VennConsuOperations } from "./components/VennConsuOperations";

export default function LaboratorioPage() {
  const [conjuntos, setConjuntos] = useState<Conjuntos>({
    A: { nome: "Conjunto A", elementos: ["1", "3", "5", "15"], length: 4 },
    B: { nome: "Conjunto B", elementos: ["2", "3", "4", "5"], length: 4 },
    C: { nome: "Conjunto C", elementos: ["5", "6", "7", "8"], length: 4 },
  });
  console.log(conjuntos);

  function adicionarElemento(id: ConjuntoId, elemento: string) {
    if (conjuntos[id].elementos.includes(elemento)) return;
    setConjuntos((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        elementos: [...prev[id].elementos, elemento],
      },
    }));
  }

  function removerElemento(id: ConjuntoId, elemento: string) {
    setConjuntos((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        elementos: prev[id].elementos.filter((el) => el !== elemento),
      },
    }));
  }

  function limparConjunto(id: ConjuntoId) {
    setConjuntos((prev) => ({
      ...prev,
      [id]: { ...prev[id], elementos: [] },
    }));
  }

  function renomearConjunto(id: ConjuntoId, novoNome: string) {
    const valor = novoNome.trim();
    if (!valor) return;

    setConjuntos((prev) => ({
      ...prev,
      [id]: { ...prev[id], nome: valor },
    }));
  }
  return (
    <main className="min-h-screen">
      <header className="flex items-center gap-2 border-b border-gray-300 p-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full p-1 outline-blue-500 hover:outline hover:outline-offset-0 focus:outline focus:outline-offset-0"
          aria-label="Voltar para a página inicial"
        >
          <Image
            src="/logomarca.svg"
            alt="Logomarca do Espaço Venn"
            width={65}
            height={50}
          />
        </Link>
        <p className="text-sm font-medium">Laboratório Venn</p>
      </header>
      <div className="h-[calc(100vh-90px)] p-5">
        <section className="flex h-full flex-col">
          <div className="mx-auto mb-4 max-w-md text-center">
            <h1 className="mb-1 text-center text-xl font-bold">
              Bem-vindo ao Laboratório Venn
            </h1>
            <p className="text-md">
              Explore e manipule diagramas de Venn de forma interativa.
            </p>
          </div>
          <div className="flex">
            <div className="flex gap-4">
              <VennConjOperations conjuntos={conjuntos} />
              <VennConsuOperations conjuntos={conjuntos} />
            </div>
            <div className="ml-auto flex gap-4">
              <DiagramaControls
                conjuntos={conjuntos}
                onAdicionarElemento={adicionarElemento}
                onRemoverElemento={removerElemento}
                onRenomearConjunto={renomearConjunto}
                onLimparConjunto={limparConjunto}
              />
              <VennViewer conjuntos={conjuntos} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
