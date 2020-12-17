const mongoose = require("mongoose");
var Phone = mongoose.model("Phone", {
  name: { type: String },
  brandName: { type: String },
  baterySize: { type: String },
  screenSize: { type: String },
  colors: { type: String },
});

module.exports = Phone;
