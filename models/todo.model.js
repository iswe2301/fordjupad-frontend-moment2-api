"use strict";

// Inkludera Mongoose
const Mongoose = require("mongoose");

// Skapa ett schema för todos och validera datan
const todoSchema = Mongoose.Schema({
    title: {
        type: String,
        required: [true, "Du måste ange en titel"],
        minlength: [3, "Titeln måste vara minst 3 tecken"]
    },
    description: {
        type: String,
        maxlength: [200, "Beskrivningen får max vara 200 tecken"],
        required: false,
    },
    status: {
        type: String,
        enum: ["Ej påbörjad", "Pågående", "Avklarad"], // Tillåtna värden
        default: "Ej påbörjad", // Defaultvärde
    },
},
    { timestamps: true } // Skapa automatiskt createdAt och updatedAt
);

// Skapa en modell för todos
const Todo = Mongoose.model('Todo', todoSchema);

// Exportera modellen
module.exports = Todo;
