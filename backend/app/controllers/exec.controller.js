const db = require("../models");
const Client = db.client;
const exec = require('child_process').exec;
var portscanner = require('portscanner');

exports.bashanswer = (req, res) => {
    var jirata=""
    var str1 = req.body.token;  //da igual
  if (!req.body.token) {
        res.status(400).send({ message: "debes poner un token" });
        return;
      }

    console.log("token ingresado: "+str1)
    if (str1 === "" || !str1) { //no exista o este vacio el str
        str1="token"
    }
    var myShellScript = exec(`/home/ubuntu/Documents/autodigevo/automatizacion/jiro3.sh ${str1}`);
    myShellScript.stdout.on('data', (data)=>{
        jirata+=data
    });
    myShellScript.stderr.on('data', (data)=>{
        jirata+=data
    });

  // Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function load () { // We need to wrap the loop into an async function for this to work
  for (var i = 0; i <= 20; i++) {
    console.log(i);
    var resj = jirata.split("\n")
    var ll = resj.length-1
    var strr = resj[ll-1]
    if(strr === 'ok123456789'){
        var newarr = resj.slice(0,-2)
        var nestr = newarr.join('\n')
        res.send(nestr)
        break;}
    if(i==20){
        res.send("No paso nada :( revise sus bash")
    }
    await timer(1000); // then the created Promise can be awaited
  }
}

load();
}
 const util = require('util');
 const execs = util.promisify(require('child_process').exec);
 var portscanner = require('portscanner')
 
 function returnfirstportaval(init, end){
    for (i = init; i <= end; i++){

      portscanner.checkPortStatus(port, '127.0.0.1', function(error, status) {
        // Status is 'open' if currently in use or 'closed' if available
        //console.log(status)
        //console.log("jiro2")
        if (status === 'closed')
               return port
      
      })

    }
 }

 exports.basher2 = (req, res) => {
    var jirata=""
    var str1 = req.body.token;  //da igual

    if (!req.body.token) {
        res.status(400).send({ message: "debes poner un token"});
        return;
      }
    var version= "5.3"
    

async function DockerRun(bf, version, puerto, token) {
  cmd='docker run --name '+token+' --gpus all -it -p '+puerto+':8550/tcp -p '+puerto+':8550/udp -d --rm luchoaraya30/digevorep:'+version
  const { stdout, stderr } = await execs(cmd)  
  console.log(cmd)
  return bf+stdout+stderr
}

async function DockerExec(bf, token) {
  cmd='docker exec -t -d '+token+' bash /scripts/start_app.sh '+token
  const { stdout, stderr } = await execs(cmd)  
  console.log(cmd)
  return bf+stdout+stderr
}


 async function Echos(bf, str) {
    const { stdout, stderr } = await execs('echo '+str);
    return bf+stdout+stderr
  }

  async function DockerStart(bf, name) {
    const { stdout, stderr } = await execs('docker start '+name);
    return bf+stdout+stderr
  }
 
 async function Pwd(bf) {
   const { stdout, stderr } = await execs('pwd');
   return bf+stdout+stderr
 }

token=req.body.token
var init = 8550
var end = 8650
portscanner.findAPortNotInUse(init, end, function (error, port) {
  if(port){
  console.log('Puerto Escojido: ' + port)

  DockerRun("", version, port, token).
 then(run_out => DockerExec(run_out, token)).then(exec_out => {
  ip='3.131.221.80'  
  stream='rtsp://'+ip+':'+port+'/ds-test'
  out= exec_out + stream+'\n porfavor espere 2 minutos antes de ver el stream'
  console.log(stream)
  res.send({message:out,
  rtsp:stream,
idtoken: token}) 

} ).  catch(err => {
      console.log(err)
      res.status(500).send({ message:err});
      }
     )
  }
else if (error){
console.log("error: "+error)
res.status(500).send({ message: "no se pudo abrir o encontrar puertos",
errors:error });
return;
  }
  })
}

exports.Shutdocker = (req, res) => {
    var id = req.body.id
    if (!req.body.id) {
        res.status(400).send({ message: "debes poner un id"});
        return;
      }
    
  async function DockerStop(bf, id){
  cmd='docker stop '+id
  const { stdout, stderr } = await execs(cmd)  
  console.log(cmd)
  if(stdout) {
    res.send({msg:"Se ha eliminado docker: "+stdout,
  docker:stdout})
  return;
  } else if (stderr){
    res.status(500).send({ msg:err});
    return;
  }
}

DockerStop('', id).catch(err => {
  console.log(err)
  res.status(500).send({ message:err});
  })
}

exports.ShutAll = async (req, res) => {
    var pw = req.body.pw
    if (!req.body.pw) {
        res.status(400).send({ message: "debes ingresar la contrasena"});
        return;
      }
    
  async function StopAll(bf){
  
      cmd='docker stop $(docker ps -aq)'
      const { stdout, stderr } = await execs(cmd)  
      if(stdout) {
        res.send({msg:"Se han todos los eliminado docker: "+stdout,
      docker:stdout})
      return;
      } else if (stderr){
        res.status(500).send({ msg:err});
        return;
     } }

if(pw === 'jiro12345'){
     StopAll('').then( () =>  {    
     console.log("j2")  }                                 ).
     catch(err => {
      console.log(err)
      res.status(500).send({ msg:err});
      })
      } else{
          res.status(500).send({ msg:"Clave incorrecta"});
          return;
        }
}



  exports.bash2ports = (req, res) => {
    var jirata=""
    var str1 = req.body.token;  
    var clientname = req.body.name;
    console.log("jiroooooo")
    if (!req.body.token || !req.body.name) {
        res.status(400).send({ message: "debes poner un token y un nombre"});
        console.log("jooome")
        return;
      }
    var version= "5.4"
    

async function DockerRun2(bf, version, puertos, token) {
  cmd='docker run --name '+token+' --gpus all -it -p '+puertos[0]+':8550 -p '+puertos[1]+':8595 -d --rm luchoaraya30/digevorep:'+version
  const { stdout, stderr } = await execs(cmd)  
  console.log(cmd)
  return bf+stdout+stderr
}

async function DockerExec2(bf, token, clientname) {
  cmd='docker exec -t -d '+token+' bash /scripts/start_app.sh '+token+' '+clientname
  const { stdout, stderr } = await execs(cmd)  
  console.log(cmd)
  return bf+stdout+stderr
}


 async function Echos(bf, str) {
    const { stdout, stderr } = await execs('echo '+str);
    return bf+stdout+stderr
  }

  async function DockerStart(bf, name) {
    const { stdout, stderr } = await execs('docker start '+name);
    return bf+stdout+stderr
  }
 
 async function Pwd(bf) {
   const { stdout, stderr } = await execs('pwd');
   return bf+stdout+stderr
 }

token=req.body.token
var init1 = 8550
var end1 = 8649
var init2 = 8650
var end2 = 8749

var ports = [];
  portscanner.findAPortNotInUse(init1, end1).then((port) =>{
    //console.log('PORT IN USE AT: ' + port)
    ports.push(port)
    return ports
  }).then(port2 => {console.log(port2)}).
  then(() => portscanner.findAPortNotInUse(init2, end2)).
  then(jiros => {
    ports.push(jiros)
  }).then(() => {
    console.log(ports)
    jiro=JSON.stringify(ports)
    console.log(jiro)
    //res.send(jiro)
  
  }).
  then(() => DockerRun2("", version, ports, token)).
  then(() => DockerExec2("", token, clientname)).then(exec_out => {
  ip='3.131.221.80'  
  stream1=' rtsp://'+ip+':'+ports[0]+'/ds-test'
  stream2="http://"+ip+':'+ports[1]+'/'+clientname+'/'+str1+".flv"
  out= exec_out + stream1+' '+stream2+' porfavor espere 2 minutos antes de ver el stream'
  console.log(stream1)
  console.log(stream2)
  res.send({message:out,
  rtsp:stream1,
  http:stream2,
idtoken: token}) 

}).catch(err => {
  console.log(err)
  res.status(500).send({ message:err});
  }
 )


  }

  /*
  DockerRun("", version, port, token).
  then(run_out => DockerExec(run_out, token))
  */



