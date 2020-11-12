const db = require("../models");
const Company = db.company;


exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  const company = new Company({
    name: req.body.name
  });


  company
    .save(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
};


exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Company.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving company."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Company with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Company with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Company.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found!`
        });
      } else res.send({ message: "Company was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Company with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Company.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
        });
      } else {
        res.send({
          message: "Company was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Company.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Companies were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all companies."
      });
    });
};

