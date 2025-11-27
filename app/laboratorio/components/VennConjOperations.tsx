"use client";

import styled from "styled-components";
import { useState } from "react";
import { Conjuntos } from "@/types/laboratorios";
import * as ops from "@/utils/operacoesConjuntos";

type OperacoesConjuntosProps = {
  conjuntos: Conjuntos;
};

type Operacao = "uniao" | "intersecao" | "diferenca" | null;
type ConjuntoSelecionado = "A" | "B" | "C";

const Card = styled.div`
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 8px 0;
  min-width: 300px;
  height: fit-content;
`;

const Header = styled.h3`
  margin: 0 0 16px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const BotaoGrupo = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Botao = styled.button<{ ativo?: boolean }>`
  padding: 8px 12px;
  border-radius: 4px;
  border: 2px solid
    ${(props) =>
      props.ativo ? "var(--color-primary)" : "var(--bg-card-border)"};
  background: ${(props) =>
    props.ativo ? "var(--color-primary)" : "var(--bg-primary)"};
  color: ${(props) => (props.ativo ? "white" : "var(--text-primary)")};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
    background: ${(props) =>
      props.ativo ? "var(--color-primary)" : "var(--bg-primary)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DisplayInput = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--bg-card-border);
  border-radius: 4px;
  padding: 10px 12px;
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--text-primary);
  min-height: 40px;
  display: flex;
  align-items: center;
  word-break: break-all;
`;

const ResultadoBox = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  padding: 12px;
  margin-top: 12px;
`;

const ResultadoTitulo = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const ResultadoValor = styled.div`
  font-family: monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary);
  word-break: break-all;
`;

const BotaoAcao = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 0.2s;
  width: 100%;
  margin-top: 8px;

  &:hover {
    background: var(--color-primary-hover, var(--color-primary));
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConjuntosDisponiveis = styled.div`
  background: var(--bg-primary);
  border-radius: 4px;
  padding: 10px;
  margin-top: 12px;
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const ConjuntoItem = styled.div`
  margin-bottom: 6px;
  font-family: monospace;

  &:last-child {
    margin-bottom: 0;
  }
`;

export function VennConjOperations({ conjuntos }: OperacoesConjuntosProps) {
  const [operacao, setOperacao] = useState<Operacao>(null);
  const [conjSelecionados, setConjSelecionados] = useState<
    ConjuntoSelecionado[]
  >([]);
  const [resultado, setResultado] = useState<{
    valor: string[];
    explicacao: string;
  } | null>(null);

  function toggleConjunto(conj: ConjuntoSelecionado) {
    const maxConjuntos = 3; // máximo de 3 conjuntos para operações

    if (conjSelecionados.includes(conj)) {
      setConjSelecionados((prev) => prev.filter((c) => c !== conj));
    } else {
      if (conjSelecionados.length < maxConjuntos) {
        setConjSelecionados((prev) => [...prev, conj]);
      }
    }
    setResultado(null);
  }

  function limpar() {
    setOperacao(null);
    setConjSelecionados([]);
    setResultado(null);
  }

  function executarOperacao() {
    if (!operacao || conjSelecionados.length < 2) {
      return;
    }

    try {
      let res;
      const conjA = conjuntos[conjSelecionados[0]].elementos;
      const conjB = conjuntos[conjSelecionados[1]].elementos;

      if (operacao === "uniao") {
        res = ops.uniao(conjA, conjB);
      } else if (operacao === "intersecao") {
        res = ops.intersecao(conjA, conjB);
      } else if (operacao === "diferenca") {
        res = ops.diferenca(conjA, conjB);
      }

      if (res) {
        setResultado({
          valor: res.valor as string[],
          explicacao: res.explicacao,
        });
      }
    } catch (err) {
      console.error("Erro ao executar operação:", err);
    }
  }

  function getDisplayText(): string {
    let text = "";

    if (conjSelecionados.length > 0) {
      text += conjSelecionados[0];
    }

    if (operacao && conjSelecionados.length > 0) {
      const simbolo =
        operacao === "uniao"
          ? " ∪ "
          : operacao === "intersecao"
            ? " ∩ "
            : " - ";

      // Adiciona o símbolo e todos os outros conjuntos
      for (let i = 1; i < conjSelecionados.length; i++) {
        text += simbolo + conjSelecionados[i];
      }
    }

    return text || "Selecione a operação e os conjuntos";
  }


  const canExecute = operacao && conjSelecionados.length >= 2;

  return (
    <Card>
      <Header>Operações de Conjuntos</Header>

      <Section>
        <SectionTitle>1. Selecione a operação</SectionTitle>
        <BotaoGrupo>
          <Botao
            ativo={operacao === "uniao"}
            onClick={() => {
              setOperacao("uniao");
              setResultado(null);
            }}
          >
            ∪ União
          </Botao>
          <Botao
            ativo={operacao === "intersecao"}
            onClick={() => {
              setOperacao("intersecao");
              setResultado(null);
            }}
          >
            ∩ Interseção
          </Botao>
          <Botao
            ativo={operacao === "diferenca"}
            onClick={() => {
              setOperacao("diferenca");
              setResultado(null);
            }}
          >
            - Diferença
          </Botao>
        </BotaoGrupo>
      </Section>

      <Section>
        <SectionTitle>2. Selecione os conjuntos (mín 2)</SectionTitle>
        <BotaoGrupo>
          {(["A", "B", "C"] as const).map((conj) => (
            <Botao
              key={conj}
              ativo={conjSelecionados.includes(conj)}
              onClick={() => toggleConjunto(conj)}
            >
              {conj} ({conjuntos[conj].elementos.length})
            </Botao>
          ))}
        </BotaoGrupo>
      </Section>

      <Section>
        <SectionTitle>3. Expressão</SectionTitle>
        <DisplayInput>{getDisplayText()}</DisplayInput>
      </Section>

      <BotaoAcao onClick={executarOperacao} disabled={!canExecute}>
        Calcular
      </BotaoAcao>

      <Botao
        onClick={limpar}
        style={{
          width: "100%",
          marginTop: "8px",
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        Limpar
      </Botao>

      {resultado && (
        <ResultadoBox>
          <ResultadoTitulo>Resultado</ResultadoTitulo>
          <ResultadoValor>
            {resultado.valor.length > 0
              ? `{ ${resultado.valor.join(", ")} }`
              : "∅ (vazio)"}
          </ResultadoValor>
        </ResultadoBox>
      )}

      <ConjuntosDisponiveis>
        <strong>Conjuntos disponíveis:</strong>
        {(["A", "B", "C"] as const).map((conj) => (
          <ConjuntoItem key={conj}>
            {conj}: {"{"}
            {conjuntos[conj].elementos.join(", ")}
            {"}"}
          </ConjuntoItem>
        ))}
      </ConjuntosDisponiveis>
    </Card>
  );
}
