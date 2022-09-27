const { playlists, error } = require("../data");

let idGen = 0;

function showAll(req, res, next) {
  playlists.length && res.status(200).json(playlists);
  res.status(404).send(error.caption + error.message.playlists[1]);
}

function show(req, res, next) {
  const playlist = playlists.find(element => element.id === +req.params.id);

  playlist && res.json(playlist);
  res.status(404).send(error.caption + error.message.playlists[0]);
}

function create(req, res, next) {
  const idGenInit = idGen;

  idGen++;

  while (playlists.findIndex(element => element.id === idGen) !== -1) idGen++;

  const newPlaylist = {
    id: idGen,
    name: req.body.name,
    author: req.body.author,
    songs: req.body.songs,
  };

  if (Object.values(newPlaylist).some(element => !element)) {
    idGen = idGenInit;
    res.status(400).send(error.caption + error.message.songs[2]);
  } else {
    playlists.push(newPlaylist);
    res.status(201).json(newPlaylist);
  }
}

function update(req, res, next) {
  let index = playlists.findIndex(element => element.id === +req.params.id);

  if (playlists[index]) {
    playlists[index] = {
      id: +req.params.id,
      name: req.body.name,
      author: req.body.author,
      songs: req.body.songs,
    };
    res.status(204).end();
  } else res.status(404).send(error.caption + error.message.playlists[0]);
}

function remove(req, res, next) {
  const index = playlists.findIndex(element => element.id === +req.params.id);

  if (playlists[index]) {
    const playlistDetails = `${playlists[index].name} (ID #${playlists[index].id})`;

    playlists.splice(index, 1);
    res
      .status(200)
      .send(
        `Playlist <b><span style="color: #ff0000;">${playlistDetails}</span></b> removida com sucesso.`
      );
  }
  res.status(404).send(error.caption + error.message.playlists[0]);
}

module.exports = { showAll, show, create, update, remove };
