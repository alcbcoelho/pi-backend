const mongoose = require("mongoose");
const { Schema } = mongoose;

const message = require("../misc/validationMessages");

const playlistSchema = new Schema({
  name: {
    type: String,
    required: [true, message.mandatoryField()],
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  songs: {
    type: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    required: [
      true,
      "É obrigatório que haja ao menos uma música incluída na playlist.",
    ],
  },
});

module.exports = mongoose.model("Playlist", playlistSchema);