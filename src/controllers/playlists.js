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
    idGen++;

    while (playlists.findIndex(element => element.id === idGen) !== -1) idGen++;
  
    playlists.push({
      id: idGen,
      name: req.body.name,
      author: req.body.author,
      songs: req.body.songs,
    });
    res.status(201).json(playlists[playlists.length - 1]);
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
      // res.json(playlists); // checagem
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
      // res.status(204).end();
      // res.json(playlists); // checagem
    }
    res.status(404).send(error.caption + error.message.playlists[0]);
}

module.exports = { showAll, show, create, update, remove };