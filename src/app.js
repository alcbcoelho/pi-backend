const express = require("express");
const app = express();

app.use(express.json());

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const playlistsRouter = require("./routes/playlists");
app.use("/playlists", playlistsRouter);

module.exports = app;