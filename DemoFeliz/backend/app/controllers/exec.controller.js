//const { exec } = require('child_process');

const exec = require('child_process').exec;

/*
const myShellScript = exec('sh doSomething.sh /myDir');
myShellScript.stdout.on('data', (data)=>{
    console.log(data); 
    // do whatever you want here with data
});
myShellScript.stderr.on('data', (data)=>{
    console.error(data);
});
*/


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
        //console.log(data); 
        // do whatever you want here with data
        //jirata.concat(JSON.stringify(data));
        //jirata +="2"
        //res.send(JSON.stringify(data))
        //jirata+=JSON.stringify(data)
        jirata+=data
        //jirata+=" "
    });
    myShellScript.stderr.on('data', (data)=>{
        //console.error(data);
        //jirata.concat(JSON.stringify(data))
        //jirata +="2"
        jirata+=data
        //jirata+=" "
    });

    /*
    console.log("esperemos")
    setTimeout(function() {
        console.log("ok")
        console.log(jirata)
    res.send(jirata)},(5*1000));
    */
    
    
// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function load () { // We need to wrap the loop into an async function for this to work
  for (var i = 0; i <= 20; i++) {
    console.log(i);
    var resj = jirata.split("\n")
    var ll = resj.length-1
    //console.log(resj)
    //console.log(resj[0])
    //console.log(resj[1])
    //console.log(ll)
    //console.log(ll-1)
    //console.log(resj[ll-1])
    var strr = resj[ll-1]
    if(strr === 'ok123456789'){
        //var tests = jirata.slice(0,-2)
        //console.log("AA")
        //console.log(tests)
        var newarr = resj.slice(0,-2)
        var nestr = newarr.join('\n')
        //console.log(nestr)
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

 



    /*

    Company.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Company with id "});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Company with id="});
      });
  };


  */


 const util = require('util');
 const execs = util.promisify(require('child_process').exec);

 exports.basher2 = (req, res) => {
    var jirata=""
    var str1 = req.body.token;  //da igual

    if (!req.body.token || !req.body.version || !req.body.puerto) {
        res.status(400).send({ message: "debes poner un token, version y puerto" });
        return;
      }

    

    /*
    jiren = function(callback){
        execute("docker start elastic_gould"  , function(docker){
            execute("bash /home/ubuntu/Documents/autodigevo/automatizacion/jiro.sh", function(basha){
                callback(docker+" "+basha);
            });
        });
    };
    */

    /*
   exec('echo jiro', (err, stdout, stderr) => {
    if (err) {
       console.log("error")
       res.status(500).send({ message: "Errojiro"});
      return;
    }
  
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  */
async function DockerRun(bf, version, puerto, token) {
  cmd='docker run --name '+token+' --gpus all -it -p '+puerto+':8550 -d --rm luchoaraya30/digevorep:'+version
  const { stdout, stderr } = await execs(cmd)  
  //const { stdout, stderr } = await execs('echo bf: '+bf+' version: '+version+' puerto: '+puerto+' token: '+token);
  console.log(cmd)
  //res.send(bf+stdout+stderr)
  return bf+stdout+stderr
}

async function DockerExec(bf, token) {
  cmd='docker exec -t -d '+token+' bash /scripts/start_app.sh '+token
  const { stdout, stderr } = await execs(cmd)  
  console.log(cmd)
  //res.send(bf+stdout+stderr)
  //res.send('jiro')
  return bf+stdout+stderr
}


 async function Echos(bf, str) {
    const { stdout, stderr } = await execs('echo '+str);
    //console.log('stdout:', stdout);
    //console.log('stderr:', stderr);
    //console.log(bf+stdout+stderr)
    return bf+stdout+stderr
  }

  async function DockerStart(bf, name) {
    const { stdout, stderr } = await execs('docker start '+name);
    //console.log('stdout:', stdout);
    //console.log('stderr:', stderr);
    //console.log(bf+stdout+stderr)
    return bf+stdout+stderr
  }
 
 async function Pwd(bf) {
   const { stdout, stderr } = await execs('pwd');
   //console.log('stdout:', stdout);
   //console.log('stderr:', stderr);
   //console.log(bf+stdout+stderr)
   return bf+stdout+stderr
 }
 //ls().then(() => {console.log("A")}).then( () => {console.log("B")})
 /*
 DockerStart("", "elastic_gould").
 then( cmd_out1 =>  Echos(cmd_out1, "Eco! token es: "+str1)). 
 then( cmd_out2 => Pwd(cmd_out2)).
 then( cmd_out3 => {
    console.log(cmd_out3)
    res.send(cmd_out3)
}
 ).catch(err => {
     console.log(err)
     res.status(500).send({ message:err});
    }
     )
     */

token=req.body.token
version=req.body.version
puerto=req.body.puerto



 DockerRun("", version, puerto, token).
 then(run_out => DockerExec(run_out, token)).then(exec_out => {
  ip='3.131.221.80'  
  stream='rtsp://'+ip+':'+puerto+'/ds-test'
  out= exec_out + stream+'\n porfavor espere 2 minutos antes de ver el stream'
  res.send(out) 

} ).
 
  catch(err => {
      console.log(err)
      res.status(500).send({ message:err});
      }
     )
         






}



const timer = ms => new Promise(res => setTimeout(res, ms))
async function espera_segundos (res, seg, msg) { // We need to wrap the loop into an async function for this to work
    console.log('espera: '+seg+' segundos')
    res.send(msg)
    await timer(seg*1000); // then the created Promise can be awaited
    
  }


