const prisma = require("../lib/prisma");

exports.FormularioEditarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produtos.findUnique({
      where: { id: Number(id) },
    });

    if (!produto) {
      return res.status(404).send("Produto nao encontrado");
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
  const { nome, quantidade, preco } = req.body;

  try {
    if (!nome || preco === undefined || quantidade === undefined) {
      return res.status(400).send("Preencha todos os campos do produto");
    }

    await prisma.produtos.update({
      where: { id: Number(id) },
      data: {
        nome: nome.trim(),
        quantidade: Number(quantidade),
        preco: Number(preco),
      },
    });

    return res.redirect("/produtos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Falha ao editar produto");
  }
};
