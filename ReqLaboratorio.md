# Laboratório – Espaço Venn

Este documento descreve os requisitos da página **Laboratório** do projeto **Espaço Venn**, focado em aprendizado visual e interativo de Teoria dos Conjuntos utilizando diagramas de Venn.  

---

## 📌 Visão Geral

O Laboratório é a tela principal de uso da aplicação, onde o usuário cria conjuntos, adiciona elementos, executa operações (união, interseção, diferença etc.) e visualiza tudo em um diagrama de Venn com apoio de explicações didáticas.  

Público-alvo: estudantes iniciantes em teoria dos conjuntos e professores que desejam demonstrar conceitos em sala de aula.

---

## 🧮 Objetivos da Página Laboratório

- [ ] Permitir que o usuário **manipule conjuntos** (criar, renomear, excluir, adicionar/editar/remover elementos).
- [ ] Oferecer **operações clássicas de teoria dos conjuntos** com feedback textual e visual.
- [ ] Servir como um **ambiente de prática e exploração**, não apenas como uma calculadora de conjuntos.
- [ ] Manter os dados localmente para que o aluno/usuário possa retomar o laboratório depois.

---

## 1. Requisitos Funcionais

### 1.1 Conjuntos

- [ ] O usuário pode criar até **3 conjuntos** dentro de um laboratório (A, B e C).
- [ ] Cada conjunto pode ser **nomeado**.
  - [ ] Se o nome vier vazio, o sistema usa o padrão **A**, **B** ou **C**.
- [ ] O usuário pode **renomear** cada conjunto a qualquer momento.
- [ ] O usuário pode **excluir** um conjunto (com confirmação).

### 1.2 Elementos dos conjuntos

- [ ] É possível **adicionar elementos** a cada conjunto.
  - [ ] Elementos podem ser números (`1`, `2`, `3`...) ou strings (`"Carlos"`, `"Caminhão"`...).
- [ ] É possível **remover elementos** de um conjunto.
- [ ] É possível **editar elementos** já existentes (alterar o valor).
- [ ] O sistema **não permite elementos duplicados** dentro do mesmo conjunto.
  - [ ] Em caso de tentativa de duplicação, exibir uma mensagem amigável explicando o motivo.

### 1.3 Consultas com símbolos

O usuário pode realizar consultas usando símbolos matemáticos usuais da teoria dos conjuntos:

- [ ] `∈` (pertence), `∉` (não pertence)  
- [ ] `⊂` (é subconjunto), `⊄` (não é subconjunto)  
- [ ] `⊆` (subconjunto ou igual), `⊇` (superconjunto ou igual)  
- [ ] `∪` (união), `∩` (interseção), `-` (diferença), `∅` (conjunto vazio)  

Essas consultas podem retornar:

- [ ] `true` / `false`
- [ ] E, opcionalmente, uma frase curta explicando o resultado.

### 1.4 Operações entre conjuntos

Operações mínimas a serem suportadas:

- [ ] **União**:  
  - [ ] `A ∪ B`, `A ∪ C`, `B ∪ C`, `A ∪ B ∪ C`
- [ ] **Interseção**:  
  - [ ] `A ∩ B`, `A ∩ C`, `B ∩ C`, `A ∩ B ∩ C`
- [ ] **Diferença**:  
  - [ ] `A - B`, `A - C`, `B - A`, `B - C`, etc.
- [ ] **Complementar**: planejado para futura versão (não obrigatório no MVP).

O resultado deve ser mostrado:

- [ ] Como lista de elementos (ex.: `{1, 2, 3}`)
- [ ] E destacado visualmente no diagrama de Venn.

### 1.5 Laboratórios múltiplos

- [ ] O usuário pode **criar vários “laboratórios”** diferentes (ex.: “Exemplo Aula 1”, “Lista de exercícios 2”).
- [ ] O usuário pode **renomear** o laboratório atual.
- [ ] O usuário pode **duplicar** um laboratório (copiando conjuntos e elementos).
- [ ] O usuário pode **excluir** um laboratório (com confirmação).

### 1.6 Persistência de dados

- [ ] Todos os dados (laboratórios, conjuntos, elementos) devem ser salvos localmente via **localStorage**.
- [ ] Ao reabrir a aplicação, o usuário deve conseguir retomar o último laboratório usado.
- [ ] Deve existir um botão para **resetar** o laboratório atual para o estado inicial.

---

## 2. Requisitos Didáticos (Foco em Aprendizado)

### 2.1 Painel de explicação

- [ ] Ao lado (ou abaixo) do diagrama, deve existir um painel de texto que:
  - [ ] Descreve a **operação atual** (ex.: “Você está vendo a união de A e B”).
  - [ ] Explica em linguagem simples o **significado da operação** e o que o aluno está vendo.

### 2.2 Destaques visuais

- [ ] Ao aplicar uma operação (ex.: `A ∩ B`), a região correspondente do diagrama de Venn deve ser **destacada visualmente** (cor diferente, brilho, borda etc.).
- [ ] Elementos usados em operações/consultas devem ser **destacados nas listas** de cada conjunto (ex.: sublinhado, cor de fundo).

### 2.3 Modo “Exemplo”

- [ ] O Laboratório deve oferecer um **Modo Exemplo**, que:
  - [ ] Preenche automaticamente A, B e C com conjuntos didáticos (ex.: números pares, ímpares, múltiplos de 3).
  - [ ] Sugere operações para o usuário clicar (ex.: “Clique em Interseção para ver os números que são pares e múltiplos de 3”).

### 2.4 Feedback educativo

- [ ] Quando o usuário cometer algum erro (ex.: consulta inválida, símbolo usado errado, campos obrigatórios vazios), o sistema deve:
  - [ ] Mostrar uma **mensagem clara e educativa**, explicando o que está incorreto.
  - [ ] Sempre que possível, sugerir o **formato correto**.

---

## 3. Requisitos de Interface e Usabilidade

### 3.1 Diagrama de Venn

- [ ] Diagrama de Venn **visual e interativo**, usando as cores e identidade visual do Espaço Venn.
- [ ] Legenda clara indicando:
  - [ ] Qual círculo é A, B e C.
  - [ ] Como interpretar as regiões de interseção.
- [ ] Indicação visual de **conjunto vazio** (círculo sem preenchimento ou texto “Conjunto vazio”).

### 3.2 Interação lista ↔ diagrama

- [ ] Clicar em um elemento na lista de um conjunto:
  - [ ] Deve **destacar sua posição** no diagrama.
- [ ] Clicar em uma região do diagrama:
  - [ ] Deve mostrar, em uma área de detalhes, os **elementos daquela região** (ex.: elementos de `A ∩ B`).

### 3.3 Histórico de ações

- [ ] Exibir um **histórico simples** das últimas ações, por exemplo:
  - [ ] “Adicionado 3 em A”
  - [ ] “Calculado A ∩ B”
- [ ] Esse histórico ajuda o usuário a se situar durante o uso, principalmente em aula.

### 3.4 Confirmações e desfazer

- [ ] Exclusão de conjuntos e labora­tórios deve sempre ter **confirmação**.
- [ ] Ter um botão de **“Desfazer última ação”** (quando possível) para evitar frustração.

### 3.5 Responsividade

- [ ] Layout responsivo, priorizando:
  - [ ] Uso em **notebooks/desktop** (tela de projeção em sala de aula).
  - [ ] Uso aceitável em tablets.
- [ ] A interface deve manter o diagrama de Venn legível mesmo em resoluções menores.

---

## 4. Requisitos Técnicos e Escopo Futuro

### 4.1 Limites e desempenho

- [ ] Definir um **limite máximo de elementos por conjunto** (ex.: 50) para garantir:
  - [ ] Diagrama legível.
  - [ ] Boa performance no navegador.

### 4.2 Acessibilidade

- [ ] Permitir navegação básica via **teclado**.
- [ ] Garantir **contraste adequado** entre fundo, conjuntos e textos.
- [ ] Botões com símbolos (∪, ∩, etc.) devem ter texto/tooltip com o nome da operação.

### 4.3 Exportar / importar laboratório

- [ ] Permitir **exportar** um laboratório para um arquivo (ex.: JSON).
- [ ] Permitir **importar** um laboratório salvo.
- [ ] Útil para professores compartilharem atividades com alunos.

### 4.4 Funcionalidades futuras (não obrigatórias no MVP)

- [ ] Operações de **complemento** em relação a um conjunto universo `U`.
- [ ] Visualização de **Leis de De Morgan** no diagrama.
- [ ] **Modo Quiz**:
  - [ ] Gera perguntas automáticas com base nos conjuntos atuais.
  - [ ] Pede que o aluno identifique resultados de união, interseção, diferença etc.

---

## 5. Status e Prioridade (Sugestão)

- MVP:
  - [ ] Criação/edição/exclusão de conjuntos e elementos.
  - [ ] Operações: união, interseção, diferença.
  - [ ] Diagrama de Venn básico com destaque visual.
  - [ ] Persistência via localStorage.
- Versão futura:
  - [ ] Complemento, De Morgan, Modo Quiz.
  - [ ] Exportar/importar laboratório.
  - [ ] Histórico mais avançado e desfazer múltiplas ações.

---

## 6. Referências

- Conceitos básicos de teoria dos conjuntos e operações: materiais didáticos de matemática básica.  
- Boas práticas de README e documentação em Markdown usados em projetos no GitHub.
