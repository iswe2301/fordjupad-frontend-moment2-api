"use strict";

// Inkludera Mongoose
const Mongoose = require("mongoose");

// Skapa ett schema för todos och validera datan
const todoSchema = Mongoose.Schema({
    title: {
        type: String,
        required: [true, "Du måste ange en titel"]
    },
    description: {
        type: String,
        maxlength: [250, "Beskrivningen får max vara 250 tecken"],
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
