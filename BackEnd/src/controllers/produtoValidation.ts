export interface ProdutoBody {
  nome?: string;
  preco?: string | number;
  quantidade?: string | number;
}

type ProdutoValido = {
  nome: string;
  preco: number;
  quantidade: number;
};

export function validarProduto(
  body: ProdutoBody,
): { data: ProdutoValido } | { erro: string } {
  const { nome, preco, quantidade } = body;

  if (
    typeof nome !== "string" ||
    !nome.trim() ||
    preco === "" ||
    preco === undefined ||
    quantidade === "" ||
    quantidade === undefined
  ) {
    return { erro: "Preencha todos os campos." };
  }

  const precoConvertido = Number(preco);
  const quantidadeConvertida = Number(quantidade);

  if (
    !Number.isFinite(precoConvertido) ||
    precoConvertido < 0 ||
    !Number.isInteger(quantidadeConvertida) ||
    quantidadeConvertida < 0
  ) {
    return { erro: "Informe preço e quantidade válidos e não negativos." };
  }

  return {
    data: {
      nome: nome.trim(),
      preco: precoConvertido,
      quantidade: quantidadeConvertida,
    },
  };
}

export function converterId(id: string): number | null {
  const idConvertido = Number(id);
  return Number.isInteger(idConvertido) && idConvertido > 0
    ? idConvertido
    : null;
}
