import { Pencil, Plus, Save, Trash2, Warehouse, X } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { produtosApi } from "../api";
import type { Produto, ProdutoInput } from "../types";

const formularioInicial: ProdutoInput = { nome: "", preco: 0, quantidade: 0 };

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState<ProdutoInput>(formularioInicial);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "erro" | "sucesso"; texto: string } | null>(null);

  const carregar = useCallback(async () => {
    try {
      setProdutos(await produtosApi.listar());
    } catch (error) {
      setMensagem({ tipo: "erro", texto: error instanceof Error ? error.message : "Falha ao carregar produtos." });
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { void carregar(); }, [carregar]);

  function cancelarEdicao() {
    setEditandoId(null);
    setForm(formularioInicial);
  }

  function iniciarEdicao(produto: Produto) {
    setEditandoId(produto.id);
    setForm({ nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade });
    setMensagem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function salvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSalvando(true);
    setMensagem(null);
    try {
      if (editandoId) {
        await produtosApi.editar(editandoId, form);
        setMensagem({ tipo: "sucesso", texto: "Produto atualizado com sucesso." });
      } else {
        await produtosApi.criar(form);
        setMensagem({ tipo: "sucesso", texto: "Produto cadastrado com sucesso." });
      }
      cancelarEdicao();
      await carregar();
    } catch (error) {
      setMensagem({ tipo: "erro", texto: error instanceof Error ? error.message : "Falha ao salvar produto." });
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(produto: Produto) {
    if (!window.confirm(`Excluir “${produto.nome}”?`)) return;
    try {
      await produtosApi.excluir(produto.id);
      setProdutos((atuais) => atuais.filter(({ id }) => id !== produto.id));
      if (editandoId === produto.id) cancelarEdicao();
      setMensagem({ tipo: "sucesso", texto: "Produto excluído com sucesso." });
    } catch (error) {
      setMensagem({ tipo: "erro", texto: error instanceof Error ? error.message : "Falha ao excluir produto." });
    }
  }

  return (
    <main className="content">
      <header className="page-header">
        <div><h1>Estoque</h1><p>Cadastre produtos e acompanhe o que está disponível.</p></div>
        <span className="count"><strong>{produtos.length}</strong> {produtos.length === 1 ? "produto" : "produtos"}</span>
      </header>

      {mensagem && <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>}

      <section className="card">
        <div className="card-header"><h2>{editandoId ? <Pencil size={17} /> : <Plus size={17} />}{editandoId ? "Editar produto" : "Novo produto"}</h2></div>
        <form className="form" onSubmit={salvar}>
          <label>Nome<input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Arroz 5kg" /></label>
          <div className="form-row">
            <label>Preço (R$)<input required min="0" step="0.01" type="number" value={form.preco} onChange={(e) => setForm({ ...form, preco: Number(e.target.value) })} /></label>
            <label>Quantidade<input required min="0" step="1" type="number" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: Number(e.target.value) })} /></label>
          </div>
          <div className="form-actions">
            {editandoId && <button type="button" className="button secondary" onClick={cancelarEdicao}><X size={16} />Cancelar</button>}
            <button className="button primary" disabled={salvando}>{editandoId ? <Save size={16} /> : <Plus size={16} />}{salvando ? "Salvando..." : editandoId ? "Salvar" : "Cadastrar"}</button>
          </div>
        </form>
      </section>

      <section className="card">
        <div className="card-header"><h2><Warehouse size={17} />Produtos cadastrados</h2></div>
        {carregando ? <p className="state">Carregando produtos...</p> : produtos.length === 0 ? <p className="state">Ainda não há produtos cadastrados.</p> : (
          <div className="table-wrap"><table><thead><tr><th>Produto</th><th>Preço</th><th>Qtd.</th><th>Ações</th></tr></thead><tbody>
            {produtos.map((produto) => <tr key={produto.id}><td className="product-name">{produto.nome}</td><td className="price">{produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td><td><span className="quantity">{produto.quantidade}</span></td><td><div className="actions"><button className="button small secondary" onClick={() => iniciarEdicao(produto)}><Pencil size={14} />Editar</button><button className="button small danger" onClick={() => void excluir(produto)}><Trash2 size={14} />Excluir</button></div></td></tr>)}
          </tbody></table></div>
        )}
      </section>
    </main>
  );
}
