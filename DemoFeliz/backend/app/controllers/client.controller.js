const db = require("../models");
const Client = db.client;


exports.create = (req, res) => {

  if (!req.body.modelo_primario) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  const client = new Client({
    modelo_primario: req.body.modelo_primario,
    modelo_secundario: req.body.modelo_secundario,
    guardar_metadata: req.body.guardar_metadata,
    estado: false,
    url: req.body.url,
    salida: req.body.salida
    /*video : [req.body.video.tipo, req.body.video.url]*/
  });


  client
    .save(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client."
      });
    });
};


/*exports.UpDeepstream = (req, res) => {/*
};*/

exports.findAll = (req, res) => {
  const modelo_primario = req.query.modelo_primario;
  var condition = modelo_primario ? { modelo_primario: { $regex: new RegExp(modelo_primario), $options: "i" } } : {};

  Client.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Client with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};
/*
exports.UpdateShutDown = async  (req, res) => {
  //console.log('jiro1')
  const ress = await Client.updateMany({"estado":true}, {"$set":{"estado":false}});
  ress.n;
  console.log(JSON.stringify(ress))
  res.send('jiro2')
}*/




exports.UpdateShutDown = async  (req, res) => {
  //console.log('jiro1')
  Client.updateMany({"estado":true}, {"$set":{"estado":false, "salida":""}})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: 'err'
      });
      //ok se apagaron o ya estabana apagadas
    } else res.send({ message: "ok" });
  })


  .catch(err => {
    res.status(500).send({
      message: "err"
    });
  });
  
}








exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Client.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Client.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

