module.exports = app => {
  const adres = require("../controllers/adres.controller.js");

  var router = require("express").Router();

  router.post("/", adres.create);

  router.get("/", adres.findAll);

  router.get("/:id", adres.findOne);
 
  router.put("/:id", adres.update);
 
  router.delete("/:id", adres.delete);

  router.delete("/", adres.deleteAll);

  app.use("/api/adres", router);
};