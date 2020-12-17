const { json } = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDb Connection Successful...");
    } else {
      console.log("Error : " + JSON.stringify(err, undefined, 2));
    }
  }
);

module.exports = mongoose;
