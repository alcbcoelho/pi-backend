const express = require("express");
const { songs, errorMessage } = require("../data");
const router = express.Router();

let idGen = 0;

// set ids for each artist
songs.length && songs.forEach((element, index) => (element.id = index + 1));

// GET
router.get("/", (req, res, next) => {
  const songByName = songs.filter(
    element => element.name?.toLowerCase() === req.query.name?.toLowerCase()
  );
  const songByArtist = songs.filter(
    element => element.artist?.toLowerCase() === req.query.artist?.toLowerCase()
  );

  if (req.query.name && req.query.artist) {
    if (songByName.length && songByArtist.length) {
      const song = songs.find(
        element =>
          element.name?.toLowerCase() === req.query.name?.toLowerCase() &&
          element.artist?.toLowerCase() === req.query.artist?.toLowerCase()
      );

      res.status(200).json(song);
    } else {
      songByName.length && res.status(404).send("<b>ERROR:</b> " + errorMessage.artists[0]);
      songByArtist.length && res.status(404).send("<b>ERROR:</b> " + errorMessage.songs[0]);
      res
        .status(404)
        .send(`<b>ERROR:</b> ${errorMessage.artists[0]}<br><br>${errorMessage.songs[0]}`);
    }
  } else if (req.query.name) {
    if (songByName.length) {
      songByName.length === 1 && res.status(200).json(...songByName);
      res.status(200).json(songByName);
    } else res.status(404).send("<b>ERROR:</b> " + errorMessage.songs[0]);
  } else if (req.query.artist) {
    if (songByArtist.length) {
      songByArtist.length === 1 && res.status(200).json(...songByArtist);
      res.status(200).json(songByArtist);
    } else res.status(404).send("<b>ERROR:</b> " + errorMessage.artists[0]);
  } else {
    songs.length && res.status(200).json(songs);
    res.status(404).send("<b>ERROR:</b> " + errorMessage.songs[1]);
  }
});

router.get("/:id", (req, res, next) => {
  const artist = songs.find(element => element.id === +req.params.id); //

  artist && res.status(200).json(artist);
  res.status(404).send("<b>ERROR:</b> " + errorMessage.songs[0]);
});

// POST (wip)
router.post("/", (req, res, next) => {
  idGen++;

  while (songs.findIndex(element => element.id === idGen) !== -1) idGen++;

  req.body.id = idGen;
  songs.push(req.body);
  res.status(201).json(songs);
});

// PUT (wip)
router.put("/:id", (req, res, next) => {
  let index = songs.findIndex(element => element.id === +req.params.id);

  if (songs[index]) {
    req.body.id = songs[index].id;
    songs[index] = req.body;
    res.status(204).end();
    // res.json(songs); // checagem
  } else {
    // agir como método POST
    req.body.id = +req.params.id;
    songs.push(req.body);
    res.status(201).json(songs);
  }
});

// DELETE (wip)
router.delete("/:id", (req, res, next) => {
  const index = songs.findIndex(element => element.id === +req.params.id);

  if (songs[index]) {
    songs.splice(index, 1);
    res.status(204).end();
    // res.json(songs); // checagem
  }
  res.status(404).send("ERRO: Playlist não encontrada.");
});

module.exports = router;
