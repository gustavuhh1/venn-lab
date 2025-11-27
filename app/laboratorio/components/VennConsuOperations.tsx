"use client";

import styled from "styled-components";
import { useState } from "react";
import { Conjuntos } from "@/types/laboratorios";

type Simbolo = "∈" | "∉" | "⊂" | "⊄" | "⊆" | "⊇";
type ConjuntoId = "A" | "B" | "C" | null;

const Card = styled.div`
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 12px;
  min-width: 300px;
  max-width: 420px;
  height: fit-content;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const Label = styled.p`
  margin: 8px 0 6px 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
`;

const Btn = styled.button<{ $ativo?: boolean }>`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--bg-card-border);
  background: ${(p) =>
    p.$ativo ? "var(--color-primary)" : "var(--bg-primary)"};
  color: ${(p) => (p.$ativo ? "white" : "var(--text-primary)")};
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid var(--bg-card-border);
  font-size: 0.75rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: monospace;
  min-width: 80px;
`;

const Display = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--bg-card-border);
  border-radius: 4px;
  padding: 8px;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--text-primary);
  margin-bottom: 10px;
`;

const Result = styled.div<{ $verdadeiro?: boolean }>`
  background: var(--bg-primary);
  border-left: 3px solid ${(p) => (p.$verdadeiro ? "#22c55e" : "#ef4444")};
  border-radius: 4px;
  padding: 8px;
  font-size: 0.75rem;

  strong {
    color: ${(p) => (p.$verdadeiro ? "#22c55e" : "#ef4444")};
    font-size: 0.85rem;
  }
`;

const Explicacao = styled.div`
  background: rgba(59, 130, 246, 0.08);
  border-left: 3px solid var(--color-primary);
  border-radius: 4px;
  padding: 10px;
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--text-primary);

  strong {
    color: var(--color-primary);
    display: block;
    margin-bottom: 6px;
  }

  p {
    margin: 4px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

type ExplicacaoEducacional = {
  titulo: string;
  conteudo: string[];
};

const explicacoes: Record<Simbolo, ExplicacaoEducacional> = {
  "∈": {
    titulo: "Símbolo de Pertinência (∈)",
    conteudo: [
      "O símbolo ∈ significa 'pertence a' ou 'é membro de'.",
      "Usado para verificar se um elemento faz parte de um conjunto.",
      "Exemplo: 2 ∈ {1, 2, 3} é verdadeiro porque 2 está no conjunto.",
      "Exemplo: 5 ∈ {1, 2, 3} é falso porque 5 não está no conjunto.",
    ],
  },
  "∉": {
    titulo: "Símbolo de Não Pertinência (∉)",
    conteudo: [
      "O símbolo ∉ significa 'não pertence a' ou 'não é membro de'.",
      "É o oposto de ∈. Verifica se um elemento NÃO faz parte de um conjunto.",
      "Exemplo: 5 ∉ {1, 2, 3} é verdadeiro porque 5 não está no conjunto.",
      "Exemplo: 2 ∉ {1, 2, 3} é falso porque 2 está no conjunto.",
    ],
  },
  "⊂": {
    titulo: "Símbolo de Subconjunto Estrito (⊂)",
    conteudo: [
      "O símbolo ⊂ significa 'é subconjunto estrito de'.",
      "Um conjunto A é subconjunto estrito de B se todos os elementos de A estão em B, mas A ≠ B.",
      "Exemplo: {1, 2} ⊂ {1, 2, 3} é verdadeiro.",
      "Exemplo: {1, 2, 3} ⊂ {1, 2, 3} é falso (conjuntos iguais não são subconjuntos estritos).",
    ],
  },
  "⊄": {
    titulo: "Símbolo de Não Subconjunto (⊄)",
    conteudo: [
      "O símbolo ⊄ significa 'não é subconjunto de'.",
      "Um conjunto A não é subconjunto de B quando existe pelo menos um elemento em A que não está em B.",
      "Exemplo: {1, 5} ⊄ {1, 2, 3} é verdadeiro porque 5 não está em {1, 2, 3}.",
      "Exemplo: {1, 2} ⊄ {1, 2, 3} é falso (porque {1, 2} é subconjunto).",
    ],
  },
  "⊆": {
    titulo: "Símbolo de Subconjunto ou Igual (⊆)",
    conteudo: [
      "O símbolo ⊆ significa 'é subconjunto de' ou 'é igual a'.",
      "Um conjunto A é subconjunto de B se todos os elementos de A estão em B (pode incluir A = B).",
      "Exemplo: {1, 2} ⊆ {1, 2, 3} é verdadeiro.",
      "Exemplo: {1, 2, 3} ⊆ {1, 2, 3} é verdadeiro (um conjunto é subconjunto de si mesmo).",
    ],
  },
  "⊇": {
    titulo: "Símbolo de Superconjunto ou Igual (⊇)",
    conteudo: [
      "O símbolo ⊇ significa 'é superconjunto de' ou 'contém' ou 'é igual a'.",
      "Um conjunto A é superconjunto de B se todos os elementos de B estão em A (pode incluir A = B).",
      "Exemplo: {1, 2, 3} ⊇ {1, 2} é verdadeiro.",
      "Exemplo: {1, 2, 3} ⊇ {1, 2, 3} é verdadeiro (um conjunto é superconjunto de si mesmo).",
    ],
  },
};

export function VennConsuOperations({ conjuntos }: { conjuntos: Conjuntos }) {
  const [simbolo, setSimbolo] = useState<Simbolo>("∈");
  const [conjunto, setConjunto] = useState<ConjuntoId>(null);
  const [elementos, setElementos] = useState("");
  const [resultado, setResultado] = useState<{
    valor: boolean;
    texto: string;
  } | null>(null);

  const simbolos: Simbolo[] = ["∈", "∉", "⊂", "⊄", "⊆", "⊇"];
  const labels = {
    "∈": "Pertence",
    "∉": "Não Pert.",
    "⊂": "Subconjunto",
    "⊄": "Não Subconjunto",
    "⊆": "Subconj. Igual",
    "⊇": "Superconj. Igual",
  };

  function parseElementos(input: string): string[] {
    return input
      .replace(/[{}]/g, "")
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e);
  }

  function executar() {
    if (!simbolo || !conjunto || !elementos.trim()) return;

    const els = parseElementos(elementos);
    const conj = conjuntos[conjunto].elementos;
    let valor = false;
    let texto = "";

    if (simbolo === "∈") {
      valor = els.every((e) => conj.includes(e));
      texto = valor
        ? `Todos pertencem a ${conjunto}`
        : `Nem todos pertencem a ${conjunto}`;
    } else if (simbolo === "∉") {
      valor = els.every((e) => !conj.includes(e));
      texto = valor
        ? `Nenhum pertence a ${conjunto}`
        : `Alguns pertencem a ${conjunto}`;
    } else if (simbolo === "⊂") {
      valor = els.every((e) => conj.includes(e)) && els.length < conj.length;
      texto = valor
        ? `{${els.join(",")}} ⊂ ${conjunto}`
        : `Não é subconjunto estrito`;
    } else if (simbolo === "⊄") {
      valor = !els.every((e) => conj.includes(e));
      texto = valor ? `Não é subconjunto` : `É subconjunto`;
    } else if (simbolo === "⊆") {
      valor = els.every((e) => conj.includes(e)) && els.length <= conj.length;
      texto = valor ? `{${els.join(",")}} ⊆ ${conjunto}` : `Não é subconjunto`;
    } else if (simbolo === "⊇") {
      valor = conj.every((e) => els.includes(e)) && els.length >= conj.length;
      texto = valor
        ? `{${els.join(",")}} ⊇ ${conjunto}`
        : `Não é superconjunto`;
    }

    setResultado({ valor, texto });
  }
  const exp = simbolo ? explicacoes[simbolo] : null;

  return (
    <Card>
      <Title>Consultas de Conjuntos</Title>
      <Label>1. Selecione o símbolo</Label>
      <Row>
        {simbolos.map((s) => (
          <Btn key={s} $ativo={simbolo === s} onClick={() => setSimbolo(s)}>
            {s} {s && labels[s]}
          </Btn>
        ))}
      </Row>
      <Label>
        2. Selecione o conjunto e escreva os valores (separados por vírgula)
      </Label>
      <Row>
        <Input
          placeholder="1,2,3"
          value={elementos}
          onChange={(e) => setElementos(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && executar()}
        />
        {(["A", "B", "C"] as const).map((c) => (
          <Btn key={c} $ativo={conjunto === c} onClick={() => setConjunto(c)}>
            {c}
          </Btn>
        ))}
      </Row>

      <Display>
        {elementos && simbolo && conjunto
          ? `{${elementos}} ${simbolo} ${conjunto}`
          : "Preencha os campos"}
      </Display>

      <Btn onClick={executar} style={{ width: "100%", marginBottom: "10px" }}>
        Consultar
      </Btn>

      {resultado && (
        <div className="space-y-2">
          <Result $verdadeiro={resultado.valor}>
            <strong>{resultado.valor ? "✓ Verdadeiro" : "✗ Falso"}</strong>
            <div>{resultado.texto}</div>
          </Result>

          {exp && (
            <Explicacao>
              <strong>{exp.titulo}</strong>
              {exp.conteudo.map((linha, idx) => (
                <p key={idx}>• {linha}</p>
              ))}
            </Explicacao>
          )}
        </div>
      )}
    </Card>
  );
}
