module.exports = app => {
  const artigosDB = app.data.artigo;
  const database = app.data.database;

  const controller = {};

  controller.listarArtigo = async (req, res) => {
    const id = req.params.id;
    const artigo = await database.getArtigo(parseInt(id));

    if (artigo) {
      res.status(200).json(artigo);
    } else {
      res.status(200).json({ error: true, message: "Não não encontrado!" });
    }
  };

  return controller;
};
