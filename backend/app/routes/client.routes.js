module.exports = app => {
    const client = require("../controllers/client.controller.js");
    const exec = require("../controllers/exec.controller.js");

    var router = require("express").Router();
  
    router.post("/", client.create);

    router.get("/shutdownall", client.UpdateShutDown);
      
    router.get("/", client.findAll);
  
    router.get("/:id", client.findOne);
   
    router.put("/:id", client.update);
   
    router.delete("/:id", client.delete);
  
    router.delete("/", client.deleteAll);

    
  
    app.use("/api/client", router);

  


  };