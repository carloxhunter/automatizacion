module.exports = app => {
   
    const ports = require("../controllers/portscan.controller.js");
   

    var router = require("express").Router();
  
   

    router.get("/avalport", ports.avalports);
  
    
    app.use("/api/ports", router);
    

    

    

  };