module.exports = app => {
  const artigosDB = app.data.artigo;
  const controller = {};

  controller.listarArtigos = (req, res) => res.status(200).json(artigosDB);

  controller.listarArtigo = (req, res) => {
    const id = req.params.id;
    const artigo = artigosDB.artigos.data.find(
      artigo => artigo.id === parseInt(id)
    );

    if (artigo) {
      res.status(200).json(artigo);
    } else {
      res.status(200).json({ error: true, message: "Não não encontrado!" });
    }
  };

  return controller;
};
