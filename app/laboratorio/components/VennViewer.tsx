"use client";

import { useMemo } from "react";
import {
  VennDiagram,
  VennSeries,
  VennDiagramData,
  VennArc,
  VennLabel,
  Gradient,
  ChartTooltip,
} from "reaviz";
import styled from "styled-components";
import { Conjuntos } from "@/types/laboratorios";
import Link from "next/link";

type VennViewerProps = {
  conjuntos: Conjuntos;
};

type VennFormatData = {
  data: {
    key: string;
    sets: string[];
    size: number;
  };
};

function intersecao(...arrays: string[][]): string[] {
  if (arrays.length === 0) return [];
  return arrays.reduce((acc, arr) => acc.filter((el) => arr.includes(el)));
}

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  max-width: 800px;
  width: fit-content;
  height: 100%;
  min-height: 300px;
  min-width: 300px;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  text-align: center;
`;

const EmptyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const EmptyText = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  max-width: 300px;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  opacity: 0.5;
`;

export function VennViewer({ conjuntos }: VennViewerProps) {
  const { data, elementosPorRegiao, temElementos } = useMemo(() => {
    const { A, B, C } = conjuntos;

    const regiaoA = A.elementos;
    const regiaoB = B.elementos;
    const regiaoC = C.elementos;

    const regiaoAB = intersecao(A.elementos, B.elementos);
    const regiaoAC = intersecao(A.elementos, C.elementos);
    const regiaoBC = intersecao(B.elementos, C.elementos);
    const regiaoABC = intersecao(A.elementos, B.elementos, C.elementos);

    const bruto = [
      { label: "A", elementos: regiaoA },
      { label: "B", elementos: regiaoB },
      { label: "C", elementos: regiaoC },
      { label: "A | B", elementos: regiaoAB },
      { label: "A | C", elementos: regiaoAC },
      { label: "B | C", elementos: regiaoBC },
      { label: "A | B | C", elementos: regiaoABC },
    ];

    const filtrado = bruto.filter((r) => r.elementos.length > 0);

    // Verifica se há pelo menos um elemento em algum conjunto
    const temElementos =
      A.elementos.length > 0 ||
      B.elementos.length > 0 ||
      C.elementos.length > 0;

    const elementosPorRegiaoLocal: Record<string, string[]> = {};
    const dataLocal: VennDiagramData[] = [];

    filtrado.forEach((r) => {
      elementosPorRegiaoLocal[r.label] = r.elementos;
      const key = r.label.split(" | ");
      dataLocal.push({ key, data: r.elementos.length });
    });

    return {
      data: dataLocal,
      elementosPorRegiao: elementosPorRegiaoLocal,
      temElementos,
    };
  }, [conjuntos]);

  // Se não tem elementos, mostra mensagem vazia
  if (!temElementos || data.length === 0) {
    return (
      <ViewerContainer>
        <EmptyState>
          <EmptyIcon>∅</EmptyIcon>
          <EmptyTitle>Conjuntos Vazios</EmptyTitle>
          <EmptyText>
            Nenhum elemento foi adicionado aos conjuntos ainda. Adicione
            elementos no painel de controle para visualizar o diagrama de Venn.
          </EmptyText>
        </EmptyState>
      </ViewerContainer>
    );
  }

  return (
    <ViewerContainer>
      <h2 className="absolute top-0 pt-5">Visualizador Diagrama de Venn</h2>
      <p className="absolute right-0 bottom-0 mr-1 ml-auto">
        powered by{" "}
        <Link
          href="https://reaviz.dev/docs/charts/venn-diagram#venn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Venn.js
        </Link>
      </p>
      <VennDiagram
        id="laboratorio-venn"
        height={450}
        width={450}
        data={data}
        series={
          <VennSeries
            arc={
              <VennArc
                tooltip={
                  <ChartTooltip
                    content={(d: { x: string; y: number }) => {
                      const label = d.x as string;
                      const size = d.y as number;
                      const elementos = elementosPorRegiao[label] ?? [];

                      return (
                        <div className="rounded bg-slate-800 p-2 text-xs text-white">
                          <div className="font-semibold">{label}</div>
                          <div className="mt-1">Tamanho: {size}</div>
                          <div className="mt-1">
                            Elementos:{" "}
                            {elementos.length > 0
                              ? elementos.join(", ")
                              : "nenhum"}
                          </div>
                        </div>
                      );
                    }}
                  />
                }
                strokeWidth={2}
                gradient={<Gradient />}
              />
            }
            label={
              <VennLabel
                labelType="value"
                showAll
                format={(f: VennFormatData) => {
                  const keyRaw = f.data.key as string;
                  const label = keyRaw.split("|").join(" | ");
                  const size = f.data.size as number;
                  const elementos = elementosPorRegiao[label] ?? [];

                  const lista = elementos.join(", ");
                  return `${label} (${size}): [${lista}]`;
                }}
              />
            }
          />
        }
      />
    </ViewerContainer>
  );
}
