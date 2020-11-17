module.exports = app => {
    const client = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", client.create);
      
    router.get("/", client.findAll);
  
    router.get("/:id", client.findOne);
   
    router.put("/:id", client.update);
   
    router.delete("/:id", client.delete);
  
    router.delete("/", client.deleteAll);
  
    app.use("/api/client", router);

    router.post("/", exec.bashanswer);
    router.post("/bash", exec.basher2)
    app.use("/api/exec", router);
  };