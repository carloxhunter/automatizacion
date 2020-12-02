module.exports = app => {
   
    const ports = require("../controllers/portscan.controller.js");
   

    var router = require("express").Router();
  
   

    router.get("/avalport", ports.avalports);
    router.get("/jiports", ports.jiports);
  
    
    app.use("/api/ports", router);
    

    

    

  };