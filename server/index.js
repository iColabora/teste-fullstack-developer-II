const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

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

app.post("/save-inputs", (req, res) => {
  console.log(req.body.teste);
});

app.post("/teste", (req, res) => {
  console.log(req.header);
});

app.listen(3001, () => {
  console.log("Is alive!!!");
});
