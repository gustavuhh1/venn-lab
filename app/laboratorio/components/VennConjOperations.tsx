"use client";

import styled from "styled-components";
import { useState } from "react";
import { Conjuntos } from "@/types/laboratorios";
import * as ops from "@/utils/operacoesConjuntos";

type OperacoesConjuntosProps = {
  conjuntos: Conjuntos;
};

type Operacao = "uniao" | "intersecao" | "diferenca" | "null";
type ConjuntoSelecionado = "A" | "B" | "C";

const Card = styled.div`
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 8px 0;
  min-width: 300px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h3`
  margin: 0 0 16px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  flex-shrink: 0;
`;

const Section = styled.div`
  margin-bottom: 16px;
  flex-shrink: 0;
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

const Botao = styled.button<{ $ativo?: boolean }>`
  padding: 8px 12px;
  border-radius: 4px;
  border: 2px solid
    ${(props) =>
      props.$ativo ? "var(--color-primary)" : "var(--bg-card-border)"};
  background: ${(props) =>
    props.$ativo ? "var(--color-primary)" : "var(--bg-primary)"};
  color: ${(props) => (props.$ativo ? "white" : "var(--text-primary)")};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
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

const BotoesAcao = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  margin-bottom: 12px;
`;

const BotaoAcao = styled.button`
  flex: 1;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: var(--color-primary-hover, var(--color-primary));
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultadoScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg-primary);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 3px;

    &:hover {
      background: var(--color-primary-hover, var(--color-primary));
    }
  }
`;

const ResultadoBox = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  padding: 12px;
  flex-shrink: 0;
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

const Explicacao = styled.div`
  background: rgba(59, 130, 246, 0.08);
  border-left: 3px solid var(--color-primary);
  border-radius: 4px;
  padding: 10px;
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--text-primary);
  flex-shrink: 0;

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

const ConjuntosDisponiveis = styled.div`
  background: var(--bg-primary);
  border-radius: 4px;
  padding: 10px;
  margin-top: 12px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  flex-shrink: 0;
  max-height: 120px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--bg-card-border);
    border-radius: 2px;
  }
`;

const ConjuntoItem = styled.div`
  margin-bottom: 6px;
  font-family: monospace;

  &:last-child {
    margin-bottom: 0;
  }
`;

type ExplicacaoEducacional = {
  titulo: string;
  conteudo: string[];
};

const explicacoes: Record<Operacao, ExplicacaoEducacional> = {
  uniao: {
    titulo: "Operação de União (∪)",
    conteudo: [
      "A união de dois conjuntos A e B, representada por A ∪ B, é um novo conjunto que contém TODOS os elementos de A E TODOS os elementos de B.",
      "Se um elemento aparece em ambos os conjuntos, ele aparece apenas uma vez no resultado (sem repetição).",
      "Exemplo: {1, 2, 3} ∪ {3, 4, 5} = {1, 2, 3, 4, 5}. Note que o 3 não é repetido.",
      "A união é como 'juntar tudo' em um único conjunto.",
    ],
  },
  intersecao: {
    titulo: "Operação de Interseção (∩)",
    conteudo: [
      "A interseção de dois conjuntos A e B, representada por A ∩ B, é um novo conjunto que contém APENAS os elementos que aparecem em AMBOS os conjuntos.",
      "Se nenhum elemento é comum aos dois conjuntos, o resultado é um conjunto vazio (∅).",
      "Exemplo: {1, 2, 3} ∩ {3, 4, 5} = {3}. Apenas o 3 aparece nos dois conjuntos.",
      "A interseção é como encontrar os 'elementos em comum' entre dois conjuntos.",
    ],
  },
  diferenca: {
    titulo: "Operação de Diferença (-)",
    conteudo: [
      "A diferença de dois conjuntos A e B, representada por A - B, é um novo conjunto que contém os elementos que estão em A MAS NÃO estão em B.",
      "Se todos os elementos de A também estão em B, o resultado é um conjunto vazio (∅).",
      "Exemplo: {1, 2, 3} - {3, 4, 5} = {1, 2}. Removemos os elementos que aparecem também em B.",
      "A diferença é como 'remover de A os elementos que estão em B'.",
    ],
  },
  null: { titulo: "", conteudo: [] },
};

export function VennConjOperations({ conjuntos }: OperacoesConjuntosProps) {
  const [operacao, setOperacao] = useState<Operacao>("null");
  const [conjSelecionados, setConjSelecionados] = useState<
    ConjuntoSelecionado[]
  >([]);
  const [resultado, setResultado] = useState<{
    valor: string[];
    explicacao: string;
  } | null>(null);

  function toggleConjunto(conj: ConjuntoSelecionado) {
    const maxConjuntos = 3;

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
    setOperacao("null");
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

      for (let i = 1; i < conjSelecionados.length; i++) {
        text += simbolo + conjSelecionados[i];
      }
    }

    return text || "Selecione a operação e os conjuntos";
  }

  const canExecute = operacao && conjSelecionados.length >= 2;
  const exp = explicacoes[operacao];

  return (
    <Card>
      <Header>Operações de Conjuntos</Header>

      <Section>
        <SectionTitle>1. Selecione a operação</SectionTitle>
        <BotaoGrupo>
          <Botao
            $ativo={operacao === "uniao"}
            onClick={() => {
              setOperacao("uniao");
              setResultado(null);
            }}
          >
            ∪ União
          </Botao>
          <Botao
            $ativo={operacao === "intersecao"}
            onClick={() => {
              setOperacao("intersecao");
              setResultado(null);
            }}
          >
            ∩ Interseção
          </Botao>
          <Botao
            $ativo={operacao === "diferenca"}
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
              $ativo={conjSelecionados.includes(conj)}
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

      <BotoesAcao>
        <BotaoAcao onClick={executarOperacao} disabled={!canExecute}>
          Calcular
        </BotaoAcao>
        <BotaoAcao
          onClick={limpar}
          style={{
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        >
          Limpar
        </BotaoAcao>
      </BotoesAcao>

      {resultado && (
        <ResultadoScroll>
          <ResultadoBox>
            <ResultadoTitulo>Resultado</ResultadoTitulo>
            <ResultadoValor>
              {resultado.valor.length > 0
                ? `{ ${resultado.valor.join(", ")} }`
                : "∅ (vazio)"}
            </ResultadoValor>
          </ResultadoBox>

          {exp && (
            <Explicacao>
              <strong>{exp.titulo}</strong>
              {exp.conteudo.map((linha, idx) => (
                <p key={idx}>• {linha}</p>
              ))}
            </Explicacao>
          )}
        </ResultadoScroll>
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
