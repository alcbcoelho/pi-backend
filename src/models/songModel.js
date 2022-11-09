const mongoose = require("mongoose");
const { Schema } = mongoose;

const songSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nome é obrigatório"],
        trim: true
    },
    artist: {
        type: String,
        required: [true, "Nome do artista é obrigatório"],
        trim: true
    }
});

module.exports = mongoose.model("Song", songSchema);