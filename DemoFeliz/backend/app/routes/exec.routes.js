module.exports = app => {
    const exec = require("../controllers/exec.controller.js");
  
    var router = require("express").Router();
  
    
  
    router.get("/", exec.bashanswer);

  
    app.use("/api/exec", router);
  };