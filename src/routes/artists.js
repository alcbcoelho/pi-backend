const express = require("express");
const {artists, errorMessage} = require("../data");
const router = express.Router();

let idGen = 0;

// set ids for each artist
artists.length && artists.forEach((element, index) => (element.id = index + 1));

// GET
router.get("/", (req, res, next) => {
  artists.length && res.status(200).json(artists);
  res.status(404).send(errorMessage.artists[1]);
});
router.get("/:id", (req, res, next) => {
  const artist = artists.find(element => element.id === +req.params.id); //

  artist && res.status(200).json(artist);
  res.status(404).send(errorMessage.artists[0]);
});
router.get("/:id/songs", (req, res, next) => {
  const artist = artists.find(element => element.id === +req.params.id); //

  artist && res.status(200).json(artist.songs);
  res.status(404).send(errorMessage.artists[0]);
});
router.get("/:id/songs/:song", (req, res, next) => {
  const artist = artists.find(element => element.id === +req.params.id); //
  const song = artist?.songs[+req.params.song - 1];

  if (artist) {
    song && res.status(200).json(song);
    res.status(404).send(errorMessage.songs[0]);
  }
  res.status(404).send(errorMessage.artists[0]);
});

// POST (wip)
router.post("/", (req, res, next) => {
  idGen++;

  while (artists.findIndex(element => element.id === idGen) !== -1) idGen++;

  req.body.id = idGen;
  artists.push(req.body);
  res.status(201).json(artists);
});

// PUT (wip)
router.put("/:id", (req, res, next) => {
  let index = artists.findIndex(element => element.id === +req.params.id);

  if (artists[index]) {
    req.body.id = artists[index].id;
    artists[index] = req.body;
    res.status(204).end();
    // res.json(artists); // checagem
  } else {
    // agir como método POST
    req.body.id = +req.params.id;
    artists.push(req.body);
    res.status(201).json(artists);
  }
});

// DELETE (wip)
router.delete("/:id", (req, res, next) => {
  const index = artists.findIndex(element => element.id === +req.params.id);

  if (artists[index]) {
    artists.splice(index, 1);
    res.status(204).end();
    // res.json(artists); // checagem
  }
  res.status(404).send("ERRO: Playlist não encontrada.");
});

module.exports = router;
