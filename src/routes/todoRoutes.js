const express = require("express");
const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers.js");
const todoRouter = express.Router();

todoRouter.get("/", getAllTodo);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

module.exports = todoRouter;
