
var portscanner = require('portscanner')

 exports.avalports = async (req, res) => {
    /*console.log("jiro1")
    res.send("jiro1")
    */
    //var port = 8550
    //console.log(port)

    /*
    portscanner.checkPortStatus(port, '127.0.0.1', function(error, status) {
        // Status is 'open' if currently in use or 'closed' if available
        console.log(status)
        console.log("jiro2")

        res.send(returnfirstportaval(8550,8650))
      })
      */
     var port1 = await returnportaval(8550,8650)
     //console.log(port1)
     res.send("ok")
     
        

}

async function returnportaval(init, end){
    
    portscanner.findAPortNotInUse(init, end, function (error, port) {
        console.log('PORT free: ' + port)
        
    }
    )   
    


}
    
    





function returnfirstportaval(init, end){
    for (i = init; i <= end; i++){

      portscanner.checkPortStatus(i, '127.0.0.1', function(error, status) {
        // Status is 'open' if currently in use or 'closed' if available
        //console.log(status)
        //console.log("jiro2")
        if (status === 'open')
               return i
      
      })

    }
 }