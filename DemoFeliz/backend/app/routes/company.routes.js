module.exports = app => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  router.post("/", company.create);

  router.get("/", company.findAll);

  router.get("/:id", company.findOne);
 
  router.put("/:id", company.update);
 
  router.delete("/:id", company.delete);

  router.delete("/", company.deleteAll);

  app.use("/api/company", router);
};