import type { Produto, ProdutoInput } from "./types";

async function requisicao<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { mensagem?: string } | null;
    throw new Error(body?.mensagem ?? "Não foi possível concluir a operação.");
  }

  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}

export const produtosApi = {
  listar: () => requisicao<Produto[]>("/api/produtos"),
  criar: (produto: ProdutoInput) =>
    requisicao<Produto>("/api/produtos", { method: "POST", body: JSON.stringify(produto) }),
  editar: (id: number, produto: ProdutoInput) =>
    requisicao<Produto>(`/api/produtos/${id}`, { method: "PUT", body: JSON.stringify(produto) }),
  excluir: (id: number) => requisicao<void>(`/api/produtos/${id}`, { method: "DELETE" }),
};
