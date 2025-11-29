"use client";

import styled from "styled-components";
import { PlusIcon, TrashIcon, PencilIcon } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { ConjuntoId, Conjuntos } from "@/types/laboratorios";
import { _100Bubbles } from "reaviz/stories/BubbleChart.story.js";

type DiagramaControlsProps = {
  conjuntos: Conjuntos;
  onAdicionarElemento: (id: ConjuntoId, elemento: string) => void;
  onRemoverElemento: (id: ConjuntoId, elemento: string) => void;
  onRenomearConjunto: (id: ConjuntoId, novoNome: string) => void;
  onLimparConjunto: (id: ConjuntoId) => void;
};

const Card = styled.div`
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 8px 0;
  min-width: 300px;
  height: fit-content;
`;

const Header = styled.div`
  margin-bottom: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const ConjuntoCard = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--bg-card-border);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
`;

const ConjuntoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid var(--bg-card-border);
  font-size: 0.85rem;
`;

const Button = styled.button<{ hasIcon?: boolean }>`
  padding: ${({ hasIcon }) => (hasIcon ? "6px" : "6px 12px")};
  border-radius: 4px;
  border: 1px solid #949292;
  background: var(--btn-bg);
  color: var(--btn-text);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  transition: background 0.2s;

  &:hover {
    background: #d3d3d3;
    color: ${({ hasIcon }) => (hasIcon ? "red" : "var(--btn-text)")};
  }
`;

const ElementosList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ElementoItem = styled.li`
  background: var(--color-primary);
  color: white;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 0.75rem;

  &:hover {
    opacity: 0.7;
  }
`;

export function DiagramaControls({
  conjuntos,
  onAdicionarElemento,
  onRemoverElemento,
  onRenomearConjunto,
  onLimparConjunto,
}: DiagramaControlsProps) {
  const [inputValues, setInputValues] = useState<Record<ConjuntoId, string>>({
    A: "",
    B: "",
    C: "",
  });

  // Estado local para os inputs de renomeação
  const [nomeInputs, setNomeInputs] = useState<Record<ConjuntoId, string>>({
    A: conjuntos.A.nome,
    B: conjuntos.B.nome,
    C: conjuntos.C.nome,
  });

  function handleAdicionar(id: ConjuntoId) {
    const valor = inputValues[id].trim();
    if (!valor) return;
    onAdicionarElemento(id, valor);
    setInputValues((prev) => ({ ...prev, [id]: "" }));
  }

  function handleRenomear(id: ConjuntoId) {
    const valor = nomeInputs[id].trim();
    if (!valor) return;
    onRenomearConjunto(id, valor);
    // Limpa o input após renomear
    setNomeInputs((prev) => ({ ...prev, [id]: "" }));
  }

  if (!conjuntos) {
    return <Card>Carregando...</Card>;
  }

  return (
    <Card>
      <Header>Manipulador de Conjuntos</Header>

      {(["A", "B", "C"] as ConjuntoId[]).map((id) => (
        <ConjuntoCard key={id}>
          <ConjuntoTitle>
            <span>
              {conjuntos[id].nome} ({id})
            </span>
            <div style={{ display: "flex" }}>
              <Button
                type="button"
                onClick={() => onLimparConjunto(id)}
                title="Limpar todos os elementos"
                hasIcon
              >
                <TrashIcon strokeWidth={2} size={14} />
              </Button>
            </div>
          </ConjuntoTitle>

          <InputGroup>
            <Input
              type="text"
              placeholder={`Novo nome para ${id}`}
              value={nomeInputs[id]}
              onChange={(e) =>
                setNomeInputs((prev) => ({ ...prev, [id]: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenomear(id);
              }}
            />
            <Button
              type="button"
              onClick={() => handleRenomear(id)}
              title="Renomear conjunto"
            >
              <PencilIcon size={14} />
              Renomear
            </Button>
          </InputGroup>

          <InputGroup>
            <Input
              type="text"
              placeholder={`Novo elemento para ${id}`}
              value={inputValues[id]}
              onChange={(e) =>
                setInputValues((prev) => ({ ...prev, [id]: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdicionar(id);
              }}
            />
            <Button
              type="button"
              onClick={() => handleAdicionar(id)}
              title="Adicionar elemento"
            >
              <PlusIcon size={14} />
              Adicionar
            </Button>
          </InputGroup>

          {conjuntos[id].elementos.length > 0 && (
            <ElementosList>
              {conjuntos[id].elementos.map((el) => (
                <ElementoItem key={el}>
                  <span>{el}</span>
                  <RemoveBtn
                    type="button"
                    onClick={() => onRemoverElemento(id, el)}
                    title={`Remover ${el}`}
                  >
                    ✕
                  </RemoveBtn>
                </ElementoItem>
              ))}
            </ElementosList>
          )}
        </ConjuntoCard>
      ))}
    </Card>
  );
}
