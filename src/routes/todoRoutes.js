const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");

const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers.js");
const todoRouter = express.Router();

todoRouter.get("/", authMiddleware, getAllTodo);
todoRouter.post("/", authMiddleware, createTodo);
todoRouter.put("/:id", authMiddleware, updateTodo);
todoRouter.delete("/:id", authMiddleware, deleteTodo);

module.exports = todoRouter;
