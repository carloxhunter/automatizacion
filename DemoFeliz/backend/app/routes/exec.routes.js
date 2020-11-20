module.exports = app => {
   
    const exec = require("../controllers/exec.controller.js");
   

    var router = require("express").Router();
  
   

    router.post("/bash", exec.basher2);
  
    
    app.use("/api/exec", router);
    

    

    

  };