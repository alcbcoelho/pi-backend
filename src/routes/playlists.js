const express = require("express");
const router = express.Router();

const playlists = [
  /* {id, name, songs[]} */
];

router.use(express.json());

router.get("/", (req, res, next) => {
  playlists.length && res.status(200).json(playlists);
  res.status(404).send("ERRO: Não há playlists disponíveis.");
});
router.get("/:id", (req, res, next) => {
  const playlist = playlists.find((element) => element.id === +req.params.id);
  playlist && res.json(playlist);
  res.status(404).send("ERRO: Playlist não encontrada.");
});

router.post("/", (req, res, next) => {
  req.body.id = playlists.length + 1;
  playlists.push(req.body);
  res.status(201).json(playlists);
});

router.put("/:id", (req, res, next) => {
  let index = playlists.findIndex((element) => element.id === +req.params.id);
  if (playlists[index]) {
    req.body.id = playlists[index].id;
    playlists[index] = req.body;
    res.json(playlists);  //
    // res.status(204).end();
  } else {
    // agir como método POST
    req.body.id = +req.params.id;
    playlists.push(req.body);
    res.status(201).json(playlists);
  } /* res.status(400).send("ERRO: Não é possível modificar um recurso inexistente.") */
});

router.delete("/:id", (req, res, next) => {
  const index = playlists.findIndex((element) => element.id === +req.params.id);
  if (playlists[index]) {
    playlists.splice(index, 1);
    res.json(playlists);  //
    // res.status(204).end();
  }
});

module.exports = router;

/*
[
  {
	"name": "Rock Anos 70",
	"songs": [
		"Stairway to Heaven",
		"Highway Star",
		"Riders on the Storm",
		"Bohemian Rhapsody",
		"Gimme Shelter",
		"Jailbreak"
	]
  },
  {
    "name": "Rock Anos 80",
    "songs": [
      "Welcome to the Jungle",
      "Dr. Feelgood",
      "Panama",
      "Sharp Dressed Man",
      "Money for Nothing",
      "Crazy Train"
    ]
  },

]

*/