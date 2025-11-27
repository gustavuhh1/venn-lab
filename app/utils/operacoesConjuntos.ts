export type ResultadoOperacao = {
  valor: boolean | string[];
  explicacao: string;
};

export function uniao(conj1: string[], conj2: string[]): ResultadoOperacao {
  const resultado = Array.from(new Set([...conj1, ...conj2])).sort();
  return {
    valor: resultado,
    explicacao: `União: {${resultado.join(", ")}}`,
  };
}

export function intersecao(
  conj1: string[],
  conj2: string[],
): ResultadoOperacao {
  const resultado = conj1.filter((el) => conj2.includes(el)).sort();
  return {
    valor: resultado,
    explicacao:
      resultado.length > 0
        ? `Interseção: {${resultado.join(", ")}}`
        : `Interseção: ∅ (vazia)`,
  };
}

export function diferenca(conj1: string[], conj2: string[]): ResultadoOperacao {
  const resultado = conj1.filter((el) => !conj2.includes(el)).sort();
  return {
    valor: resultado,
    explicacao:
      resultado.length > 0
        ? `Diferença: {${resultado.join(", ")}}`
        : `Diferença: ∅ (vazia)`,
  };
}

export function ehMembro(
  elemento: string,
  conjunto: string[],
): ResultadoOperacao {
  const isMembro = conjunto.includes(elemento);
  return {
    valor: isMembro,
    explicacao: isMembro
      ? `${elemento} está em ${conjunto.join(", ")}`
      : `${elemento} não está em ${conjunto.join(", ")}`,
  };
}

export function naoPertence(
  elemento: string,
  conjunto: string[],
): ResultadoOperacao {
  const isNao = !conjunto.includes(elemento);
  return {
    valor: isNao,
    explicacao: isNao
      ? `${elemento} não pertence ao conjunto`
      : `${elemento} pertence ao conjunto`,
  };
}

export function ehSubconjunto(
  conj1: string[],
  conj2: string[],
): ResultadoOperacao {
  const isSubconjunto = conj1.every((el) => conj2.includes(el));
  return {
    valor: isSubconjunto,
    explicacao: isSubconjunto
      ? `${conj1.join(", ")} é subconjunto de ${conj2.join(", ")}`
      : `${conj1.join(", ")} NÃO é subconjunto de ${conj2.join(", ")}`,
  };
}

export function ehSubconjuntoOuIgual(
  conj1: string[],
  conj2: string[],
): ResultadoOperacao {
  const isSubconjuntoOuIgual =
    conj1.every((el) => conj2.includes(el)) && conj1.length <= conj2.length;
  return {
    valor: isSubconjuntoOuIgual,
    explicacao: isSubconjuntoOuIgual
      ? `${conj1.join(", ")} ⊆ ${conj2.join(", ")}`
      : `${conj1.join(", ")} ⊄ ${conj2.join(", ")}`,
  };
}

export function ehSuperconjuntoOuIgual(
  conj1: string[],
  conj2: string[],
): ResultadoOperacao {
  const isSuperconjuntoOuIgual =
    conj2.every((el) => conj1.includes(el)) && conj1.length >= conj2.length;
  return {
    valor: isSuperconjuntoOuIgual,
    explicacao: isSuperconjuntoOuIgual
      ? `${conj1.join(", ")} ⊇ ${conj2.join(", ")}`
      : `${conj1.join(", ")} ⊉ ${conj2.join(", ")}`,
  };
}

export function estaVazio(conj: string[]): ResultadoOperacao {
  const isEmpty = conj.length === 0;
  return {
    valor: isEmpty,
    explicacao: isEmpty
      ? "Conjunto é vazio ∅"
      : `Conjunto tem ${conj.length} elemento(s)`,
  };
}
