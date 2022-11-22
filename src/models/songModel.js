// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const message = require("../validationMessages");

// const songSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, message.mandatoryField("Nome")],
//         trim: true
//     },
//     artist: {
//         type: String,
//         required: [true, message.mandatoryField("Artista")],
//         trim: true
//     }
// });
const mongoose = require("mongoose");
const songSchema = require("../misc/songSchema");

songSchema.index({ artist: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Song", songSchema);