const prisma = require("../lib/prisma");

exports.FormularioEditarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produtos.findUnique({
      where: { id: Number(id) },
    });

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    const produtos = await prisma.produtos.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.render("index", {
      produtos,
      mensagem: null,
      form: produto,
      pageTitle: "Editar produto",
      activePage: "produtos",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Falha ao carregar produto");
  }
};

exports.EditarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  try {
    const produtos = await prisma.produtos.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (!nome || !nome.trim() || preco === "" || quantidade === "") {
      return res.status(400).render("index", {
        produtos,
        mensagem: {
          tipo: "erro",
          texto: "Produto não atualizado. Preencha todos os campos.",
        },
        form: { id: Number(id), nome, preco, quantidade },
        pageTitle: "Editar produto",
        activePage: "produtos",
      });
    }

    const precoConvertido = Number(preco);
    const quantidadeConvertida = Number(quantidade);

    if (!Number.isFinite(precoConvertido) || !Number.isInteger(quantidadeConvertida)) {
      return res.status(400).render("index", {
        produtos,
        mensagem: {
          tipo: "erro",
          texto: "Produto não atualizado. Informe preço e quantidade válidos.",
        },
        form: { id: Number(id), nome, preco, quantidade },
        pageTitle: "Editar produto",
        activePage: "produtos",
      });
    }

    await prisma.produtos.update({
      where: { id: Number(id) },
      data: {
        nome: nome.trim(),
        preco: precoConvertido,
        quantidade: quantidadeConvertida,
      },
    });

    return res.redirect("/produtos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Falha ao editar produto");
  }
};
