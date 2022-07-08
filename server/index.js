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

app.post("/save-inputs", (req, res) => {
  var cont = 0;
  const inputs = req.body.map((input) => {
    new Input({
      id: input._id,
      label: input.label,
      type: input.type,
      options1: input.options1,
      options2: input.options2,
      options3: input.options3,
    })
      .save()
      .then(() => {
        cont++;
      });
  });

  if (cont === req.body.length) {
    res.send("Success!");
  } else {
    res.send("Error!");
  }
});

app.post("/teste", (req, res) => {
  console.log(req.body);
});

app.listen(3001, () => {
  console.log("Is alive!!!");
});
