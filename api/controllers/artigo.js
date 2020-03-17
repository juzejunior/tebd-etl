module.exports = app => {
  const artigosDB = app.data.artigo;
  const database = app.data.database;

  const controller = {};

  controller.listarArtigos = async (req, res) => {
    //const participantes = await database.getParticipantes();
    // console.log(database.getParticipantes());
    //console.log("participantes: ", participantes);
    const participantes = await database.getParticipantes();
    res.status(200).json(participantes);
  };

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
