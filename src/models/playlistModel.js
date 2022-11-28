const mongoose = require("mongoose");
const songSchema = require("../misc/songSchema");
const { ObjectId } = require("bson");
const { Schema } = mongoose;

const message = require("../validationMessages");

const playlistSchema = new Schema({
  name: {
    type: String,
    required: [true, message.mandatoryField()],
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: [true, message.mandatoryField()],
  },
  // songs: {
  //   type: [
  //     {
  //       type: String,
  //       set: value => {
  //         const config = require("../config/env.json");

  //         const localhost = `localhost:${config.port}/`;

  //         if (!value.includes(localhost)) value = value.replace(/localhost:\d{1,5}\//, localhost);

  //         return value;
  //       },
  //       validate: {
  //         validator: value =>
  //           /localhost:\d{1,5}\/songs\/\w{24}/.test(value),
  //         message:
  //           "Cada música da playlist deve ser referenciada por sua URL seguindo o formato: localhost:{porta}/songs/{id da música}",
  //       }
  //     },
  //   ] /* [songSchema] */,
  //   required: [
  //     true,
  //     "É obrigatório que haja ao menos uma música incluída na playlist.",
  //   ]
  // },
  songs: {
    type: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    required: [
      true,
      "É obrigatório que haja ao menos uma música incluída na playlist.",
    ],
  },
});

module.exports = mongoose.model("Playlist", playlistSchema);
