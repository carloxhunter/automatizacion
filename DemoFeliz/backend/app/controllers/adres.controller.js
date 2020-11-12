const db = require("../models");
const Adres = db.adres;


exports.create = (req, res) => {

  if (!req.body.street) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  const adres = new Adres({
    street: req.body.street,
    suite: req.body.suite,
    city: req.body.city,
    zipcode: req.body.zipcode
  });


  adres
    .save(adres)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Adres."
      });
    });
};


exports.findAll = (req, res) => {
  const street = req.query.street;
  var condition = street ? { street: { $regex: new RegExp(street), $options: "i" } } : {};

  Adres.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adres."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Adres.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Adres with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Adres with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Adres.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Adres with id=${id}. Maybe Adres was not found!`
        });
      } else res.send({ message: "Adres was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Adres with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Adres.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Adres with id=${id}. Maybe Adres was not found!`
        });
      } else {
        res.send({
          message: "Adres was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Adres with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Adres.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Adresses were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all adresses."
      });
    });
};

