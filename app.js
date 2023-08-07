const express = require("express");
const app = express();
const PORT = 4000;
const authenticateRouter = require("./routes/login")

app.set("json spaces", 2)
app.use("/trackr",authenticateRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})