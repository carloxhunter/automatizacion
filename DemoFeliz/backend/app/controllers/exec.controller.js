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
    var str1 = req.params.str;  //da igual
    if (str1 === "" || !str1) { //no exista o este vacio el str
        str1="/home/ubuntu/Documents/autodigevo/automatizacion/jiro.sh"
    }
    var myShellScript = exec('/home/ubuntu/Documents/autodigevo/automatizacion/jiro.sh');
    myShellScript.stdout.on('data', (data)=>{
        console.log(data); 
        // do whatever you want here with data
        //var jirata=data;
        res.send(JSON.stringify(data))
    });
    myShellScript.stderr.on('data', (data)=>{
        console.error(data);
        res.send(JSON.stringify(data))
    });
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