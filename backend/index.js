const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { mongoose } = require("./db.js");
const PORT = 3000;

var phpneRouter = require("./controllers/phoneController");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("App running on port : " + PORT);
});

app.use("/phone", phpneRouter);
