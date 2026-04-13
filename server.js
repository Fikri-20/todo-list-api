require("dotenv").config();
const express = require("express");

const authRouter = require("./src/routes/authRoutes.js");
const todoRouter = require("./src/routes/todoRoutes.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/", authRoute);
app.use("/todos", todoRoute);

app.listen(PORT);
