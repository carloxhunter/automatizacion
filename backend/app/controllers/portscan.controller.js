
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



exports.jiports = async (req, res) => {
 var ports = [];
  portscanner.findAPortNotInUse(3000, 4000).then((port) =>{
    console.log('PORT IN USE AT: ' + port)
    ports.push(port)
    return ports
  }).then(port2 => {console.log(port2)}).
  then(() => portscanner.findAPortNotInUse(4000, 5000)).
  then(jiros => {
    ports.push(jiros)
  }).then(() => {
    //console.log(ports)
    jiro=JSON.stringify(ports)
    console.log(jiro)
    res.send(jiro)
  
  }).
  catch(err => {
    console.log(err)
    res.status(500).send({ message:err});
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