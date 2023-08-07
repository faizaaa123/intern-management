const express = require("express");
const app = express();
const PORT = 3001;

const internRouter = require("./routes/internRoute");

app.use(express.json());
app.use(express.urlencoded());

//Mount routers
app.use("/api/v1/interns", internRouter);

app.listen(
  PORT,
  console.log(`Server is listening at port http://localhost:${PORT}`)
);

module.exports = app;
