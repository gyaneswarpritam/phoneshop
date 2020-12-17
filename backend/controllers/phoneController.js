const express = require("express");
const mongoose = require("mongoose");
const Phone = require("../models/phone");
var router = express.Router();

var objectId = mongoose.Types.ObjectId;
mongoose.set("useFindAndModify", false);
router.get("/", (req, res) => {
  Phone.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(err);
    }
  });
});

router.get("/:id", (req, res) => {
  if (!objectId.isValid(req.params.id)) {
    res.status(400).send(`No Record found with ${req.params.id}`);
  }

  Phone.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(err);
    }
  });
});

router.post("/", (req, res) => {
  var emp = new Phone({
    name: req.body.name,
    brandName: req.body.brandName,
    baterySize: req.body.baterySize,
    screenSize: req.body.screenSize,
    colors: req.body.colors,
  });
  emp.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("error : " + err);
    }
  });
});

router.put("/:id", (req, res) => {
  if (!objectId.isValid(req.params.id)) {
    res.status(400).send(`No Record found with ${req.params.id}`);
  }

  const updatedEmp = {
    name: req.body.name,
    brandName: req.body.brandName,
    baterySize: req.body.baterySize,
    screenSize: req.body.screenSize,
    colors: req.body.colors,
  };

  Phone.findByIdAndUpdate(
    req.params.id,
    { $set: updatedEmp },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.status(200).send(docs);
      } else {
        res.status(500).send("Phone not updated");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!objectId.isValid(req.params.id)) {
    res.status(400).send(`No Record found with ${req.params.id}`);
  }

  Phone.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      res.status(500).send("Some error occored");
    }
  });
});
module.exports = router;
