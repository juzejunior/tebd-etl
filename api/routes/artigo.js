module.exports = app => {
  const controller = app.controllers.artigo;
  const controllerETL = app.controllers.etl;

  app.route("/api/v1/artigos/:id").get(controller.listarArtigo);
  app.route("/api/v1/etl").get(controllerETL.etl);
};
