const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("./models/Input");
const Input = new mongoose.model("inputs");

app.use(cors());
app.use(express.urlencoded());

app.use(express.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://blog:blogsenha@cluster1.lk71ful.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conectado ao BD"))
  .catch((err) => console.log("Erro ao se conectar " + err));

app.post("/get-inputs", (req, res) => {
  Input.find().then((results) => {
    res.send(200, results);
  });
});

app.post("/save-inputs", (req, res) => {
  var cont = 0;
  new Input({ inputs: req.body })
    .save()
    .then(() => {
      res.send(200, "Success!");
    })
    .catch((err) => {
      res.send(500, `Error! ${err}`);
    });
});

app.post("/teste", (req, res) => {
  console.log(req.body);
});

app.listen(3001, () => {
  console.log("Is alive!!!");
});
