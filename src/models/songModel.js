const mongoose = require("mongoose");
const songSchema = require("../misc/songSchema");

songSchema.index({ artist: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Song", songSchema);