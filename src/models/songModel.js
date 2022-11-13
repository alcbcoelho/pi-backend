const mongoose = require("mongoose");
const { Schema } = mongoose;

const message = require("../validationMessages");

const songSchema = new Schema({
    name: {
        type: String,
        required: [true, message.mandatoryField("Nome")],
        trim: true
    },
    artist: {
        type: String,
        required: [true, message.mandatoryField("Artista")],
        trim: true
    }
});

module.exports = mongoose.model("Song", songSchema);