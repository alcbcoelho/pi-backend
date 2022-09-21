const express = require("express");
const app = express();

app.use(express.json());

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const playlistsRouter = require("./routes/playlists");
app.use("/playlists", playlistsRouter);
// const artistsRouter = require("./routes/artists");
// app.use("/artists", artistsRouter);
const songsRouter = require("./routes/songs");
app.use("/songs", songsRouter);

module.exports = app;