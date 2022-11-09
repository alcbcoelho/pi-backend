const mongoose = require("mongoose");
const Song = require("./songModel");
const { ObjectId } = require("bson");
const { Schema } = mongoose;

const playlistSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nome é obrigatório"],
        trim: true
    },
    author: {
        type: ObjectId,
        required: [true, "Autor é obrigatório"],
    },
    songs: {
        type: [Song],
        required: [true, "É obrigatório que haja ao menos uma música incluída na playlist"],
        default: undefined
    }
});

module.exports = mongoose.model("Playlist", playlistSchema);