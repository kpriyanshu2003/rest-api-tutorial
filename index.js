const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = 3000;

const apiRouter = require("./router/routes");

app.use(express.json());
app.use("/users", apiRouter);

app.get("/", (req, res) => {
  res.send("root directory. Server running.");
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("Databse connected and server listening at port" + port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
