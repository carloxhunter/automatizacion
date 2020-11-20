const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("¡Conectado a la BD!");
  })
  .catch(err => {
    console.log("¡Imposible conecta a la BD!", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Welc0ome to backend application." });
});



require("./app/routes/user.routes")(app);
require("./app/routes/adres.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/exec.routes")(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servido corriendo en el puerto ${PORT}.`);
});
