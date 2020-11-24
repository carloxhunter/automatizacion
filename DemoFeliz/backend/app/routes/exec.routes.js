module.exports = app => {
   
    const exec = require("../controllers/exec.controller.js");
   

    var router = require("express").Router();
  
   

    router.post("/bash", exec.basher2);
    router.post("/shutdocker", exec.Shutdocker);
    router.post("/shutall", exec.ShutAll);
  
    
    app.use("/api/exec", router);
    

    

    

  };