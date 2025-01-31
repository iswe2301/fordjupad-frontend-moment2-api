"use strict";

// Inkludera modellen för todos
const Todo = require("../models/todo.model");

// Metod för att hämta alla todos, exporteras för att användas i routes
exports.getAllTodos = async (request, h) => {
    try {
        // Hämta alla todos från databasen
        const todos = await Todo.find();
        // Kontrollerar om det finns todos
        if (todos.length === 0) {
            return h.response({
                message: "Inga todos hittades", // Meddelande om att inga todos hittades
                todos: [] // Returnerar en tom array
            }).code(200);
        }
        // Returnera todos med statuskod 200
        return h.response(todos).code(200);
    } catch (error) {
        // Fånga upp eventuella fel
        console.log("Fel vid hämtning av todos: ", error);
        return h.response("Något gick fel vid hämtning av todos").code(500);
    }
}

// Metod för att hämta en todo baserat på ID
exports.getTodoById = async (request, h) => {
    try {
        // Hämta todon baserat på ID
        const todo = await Todo.findById(request.params.id);
        // Kontrollera om todon inte hittades och returnera 404
        if (!todo) {
            return h.response({ error: `Todon med ID ${request.params.id} hittades inte` }).code(404);
        }
        // Returnera todon med statuskod 200
        return h.response(todo).code(200);
    } catch (error) {
        // Fånga upp eventuella fel
        console.log("Fel vid hämtning av todo: ", error);
        return h.response("Något gick fel vid hämtning av todo").code(500);
    }
}

// Metod för att skapa en todo
exports.createTodo = async (request, h) => {
    try {
        // Skapa en ny todo baserat på datan i request.payload
        const todo = new Todo(request.payload);
        const savedTodo = await todo.save();
        // Returnera den sparade todon med statuskod 201
        return h.response({
            message: "Todo skapad",
            todo: savedTodo
        }).code(201);
    } catch (error) {
        // Fånga upp eventuella valideringsfel
        if (error.name === "ValidationError") {
            const errors = {};
            // Loopa igenom valideringsfelen och lägg till dem i errors-objektet
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            // Returnera felmeddelanden med statuskod 400
            return h.response({
                message: "Fel vid skapande av todo",
                errors: errors
            }).code(400);
        }
        // Fånga upp eventuella andra fel
        console.log("Fel vid skapande av todo: ", error);
        return h.response("Något gick fel vid skapande av todo").code(500);
    }
}

// Metod för att uppdatera en todo
exports.updateTodo = async (request, h) => {
    try {
        // Kontrollera om todon finns och returnera 404 om den inte hittas
        const todo = await Todo.findById(request.params.id);
        if (!todo) {
            return h.response({ error: `Todon med ID ${request.params.id} hittades inte` }).code(404);
        }
        // Uppdatera todon baserat på ID och request.payload
        const updatedTodo = await Todo.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true, runValidators: true } // Kör validering 
        );
        // Returnera den uppdaterade todon med statuskod 200
        return h.response({
            message: "Todo uppdaterad",
            todo: updatedTodo
        }).code(200);
    } catch (error) {
        // Fånga upp eventuella valideringsfel
        if (error.name === "ValidationError") {
            const errors = {};
            // Loopa igenom valideringsfelen och lägg till dem i errors-objektet
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            // Returnera felmeddelanden med statuskod 400
            return h.response({
                message: "Fel vid uppdatering av todo",
                errors: errors
            }).code(400);
        }
        // Fånga upp eventuella andra fel
        console.log("Fel vid uppdatering av todo: ", error);
        return h.response("Något gick fel vid uppdatering av todo").code(500);
    }
}

// Metod för att ta bort en todo
exports.deleteTodo = async (request, h) => {
    try {
        // Kontrollera om todon finns och returnera 404 om den inte hittas
        const todo = await Todo.findById(request.params.id);
        if (!todo) {
            return h.response({ error: `Todon med ID ${request.params.id} hittades inte` }).code(404);
        }
        // Ta bort todon baserat på ID och returnera meddelande och ID med statuskod 200 om borttagningen lyckas
        await Todo.findByIdAndDelete(request.params.id);
        return h.response({
            message: "Todon har tagits bort",
            id: request.params.id
        }).code(200);
    } catch (error) {
        // Fånga upp eventuella fel
        console.log("Fel vid borttagning av todo: ", error);
        return h.response("Något gick fel vid borttagning av todo").code(500);
    }
}