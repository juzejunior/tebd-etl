module.exports = app => {
  const controller = app.controllers.artigo;
  app.route("/api/v1/artigos/:id").get(controller.listarArtigo);
};
