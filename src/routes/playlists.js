const express = require("express");
const { error, playlists } = require("../data");
const router = express.Router();

let idGen = 0;

// GET
router.get("/", (req, res, next) => {
  playlists.length && res.status(200).json(playlists);
  res.status(404).send(error.caption + error.message.playlists[1]);
});
router.get("/:id", (req, res, next) => {
  const playlist = playlists.find(element => element.id === +req.params.id);

  playlist && res.json(playlist);
  res.status(404).send(error.caption + error.message.playlists[0]);
});

// POST
router.post("/", (req, res, next) => {
  idGen++;

  while (playlists.findIndex(element => element.id === idGen) !== -1) idGen++;

  playlists.push({ id: idGen, name: req.body.name, author: req.body.author, songs: req.body.songs });
  res.status(201).json(playlists[playlists.length - 1]);
});

// PUT
router.put("/:id", (req, res, next) => {
  let index = playlists.findIndex(element => element.id === +req.params.id);

  if (playlists[index]) {
    req.body.id = playlists[index].id;
    playlists[index] = req.body;
    res.status(204).end();
    // res.json(playlists); // checagem
  } else {
    // agir como método POST
    req.body.id = +req.params.id;
    playlists.push({ id: idGen, name: req.body.name, author: req.body.author, songs: req.body.songs });
    res.status(201).json(playlists);
  }
});

// DELETE
router.delete("/:id", (req, res, next) => {
  const index = playlists.findIndex(element => element.id === +req.params.id);

  if (playlists[index]) {
    const playlistDetails = `${playlists[index].name} (ID #${playlists[index].id})`;

    playlists.splice(index, 1);
    res
      .status(200)
      .send(
        `Playlist <b><span style="color: #ff0000;">${playlistDetails}</span></b> removida com sucesso.`
      );
    // res.status(204).end();
    // res.json(playlists); // checagem
  }
  res.status(404).send(error.caption + error.message.playlists[0]);
});

module.exports = router;
