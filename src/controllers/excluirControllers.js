const prisma = require("../lib/prisma");

exports.ExcluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.produtos.delete({
      where: { id: Number(id) },
    });

    return res.redirect("/produtos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Falha ao excluir produto");
  }
};
