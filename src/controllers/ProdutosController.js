const prisma = require("../lib/prisma");

exports.ListarProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produtos.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.render("index", {
      produtos,
      mensagem: null,
      form: null,
      pageTitle: "Produtos",
      activePage: "produtos",
    });
  } catch (erro) {
    console.log(erro);
    return res.status(500).send("Falha ao carregar produtos");
  }
};

exports.CadastrarProduto = async (req, res) => {
  try {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco === undefined || quantidade === undefined) {
      return res.status(400).send("Preencha todos os campos do produto");
    }

    await prisma.produtos.create({
      data: {
        nome: nome.trim(),
        preco: Number(preco),
        quantidade: Number(quantidade),
      },
    });

    return res.redirect("/produtos");
  } catch (erro) {
    console.log(erro);
    return res.status(500).send("Falha ao cadastrar produto");
  }
};

