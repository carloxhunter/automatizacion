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
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Welc0ome to backend application." });
});

app.get("/jiro", (req, res) => {
  res.json({ message: "jirororo" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/adres.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/exec.routes")(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
