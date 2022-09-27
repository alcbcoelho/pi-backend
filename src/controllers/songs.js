const { songs, error } = require("../data");

let idGen = 0;

// set ids for each user
songs.length && songs.forEach((element, index) => (element.id = index + 1));

function showAllOrFilter(req, res, next) {
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

      song && res.status(200).json(song);
      res.status(404).send(error.caption + error.message.songs[0]);
    } else {
      songByName.length &&
        res.status(404).send(error.caption + error.message.artists[0]);
      songByArtist.length &&
        res.status(404).send(error.caption + error.message.songs[0]);
      res
        .status(404)
        .send(
          `<b>ERRO:</b> ${error.message.artists[0]}<br><br>${error.message.songs[0]}`
        );
    }
  } else if (req.query.name) {
    if (songByName.length) {
      songByName.length === 1 && res.status(200).json(...songByName);
      res.status(200).json(songByName);
    } else res.status(404).send(error.caption + error.message.songs[0]);
  } else if (req.query.artist) {
    if (songByArtist.length) {
      songByArtist.length === 1 && res.status(200).json(...songByArtist);
      res.status(200).json(songByArtist);
    } else res.status(404).send(error.caption + error.message.artists[0]);
  } else {
    songs.length && res.status(200).json(songs);
    res.status(404).send(error.caption + error.message.songs[1]);
  }
}

function show(req, res, next) {
  const song = songs.find(element => element.id === +req.params.id);

  song && res.status(200).json(song);
  res.status(404).send(error.caption + error.message.songs[0]);
}

function create(req, res, next) {
  const idGenInit = idGen;

  idGen++;

  while (songs.findIndex(element => element.id === idGen) !== -1) idGen++;

  const newSong = { id: idGen, name: req.body.name, artist: req.body.artist };

  if (Object.values(newSong).some(element => !element)) {
    idGen = idGenInit;
    res.status(400).send(error.caption + error.message.alertOnMissingAttributes("música"));
  } else {
    songs.push(newSong);
    res.status(201).json(newSong);
  }
}

function update(req, res, next) {
  let index = songs.findIndex(element => element.id === +req.params.id);

  if (songs[index]) {
    songs[index] = { id: +req.params.id, name: req.body.name, artist: req.body.artist };
    res.status(204).end();
  } else res.status(404).send(error.caption + error.message.songs[0]);
}

function remove(req, res, next) {
  const index = songs.findIndex(element => element.id === +req.params.id);

  if (songs[index]) {
    const songDetails = `${songs[index].artist} - ${songs[index].name} (ID #${songs[index].id})`;

    songs.splice(index, 1);
    res
      .status(200)
      .send(
        `<b><span style="color: #ff0000;">${songDetails}</span></b> removida com sucesso.`
      );
  }
  res.status(404).send(error.caption + error.message.songs[0]);
}

module.exports = { showAllOrFilter, show, create, update, remove };