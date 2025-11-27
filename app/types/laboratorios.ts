export type ConjuntoData = {
  nome: string;
  elementos: string[];
  length: number;
};

export type Conjuntos = {
  A: ConjuntoData;
  B: ConjuntoData;
  C: ConjuntoData;
};

export type ConjuntoId = keyof Conjuntos;