"use strict";

// Inkludera controllern för todos
const todoController = require("../controllers/todo.controller");

// Routes som exporteras
module.exports = (server) => {
    // Definiera routes
    server.route([
        {
            method: "GET", // HTTP-metod
            path: "/todos", // URL (sökväg) för API-endpoint
            handler: todoController.getAllTodos // Metod som körs i controllern
        },
        {
            method: "GET",
            path: "/todo/{id}",
            handler: todoController.getTodoById
        },
        {
            method: "POST",
            path: "/todo",
            handler: todoController.createTodo
        },
        {
            method: "PUT",
            path: "/todo/{id}",
            handler: todoController.updateTodo
        },
        {
            method: "DELETE",
            path: "/todo/{id}",
            handler: todoController.deleteTodo
        }]
    );
}