export type Produto = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

export type ProdutoInput = Omit<Produto, "id">;
