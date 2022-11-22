const { ObjectId } = require("bson");
const { User } = require("../classes/User");
const Playlist = require("../models/playlistModel");
const Song = require("../models/songModel");
const { mandatoryField } = require("../validationMessages");

const populateOptions = { path: "author songs", select: "username name artist" };

async function showAll(req, res, next) {
  await Playlist.find().populate(populateOptions)
  .then(doc => {
    if (doc.length) return res.status(200).json(doc);
    return res.status(404).json({ erro: "Não há playlists disponíveis." });   //
  })
  .catch(err => res.status(500).json(err.message));
}

async function show(req, res, next) {
  await Playlist.findOne({ _id: ObjectId(req.params.id) }).populate(populateOptions)
    .then(doc => {
      if (doc) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Playlist não encontrada." });
    })
    .catch(err => res.status(500).json(err.message));
}

async function create(req, res, next) {
  // TODO: Quando implementar autenticação de usuário, fazer o campo "author" automaticamente herdar o nome do usuário que está logado

  const playlist = new Playlist(req.body);

  await (await playlist.save()).populate(populateOptions)
    .then(doc => {
      //
      // req.body.songs.forEach(song => integrateSongWithDB(song))
      //
      return res.status(201).json(doc);
    })
    .catch(err => {
      if (err.errors) {
        const errorMessage = {};

        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        return res.status(422).json(errorMessage);  // TODO: criar uma função p/ esse tratamento de erro e importar p/ os 3 controllers
      }

      return res.status(500).json(err.message);
    })

  // const idGenInit = idGen;

  // idGen++;

  // while (playlists.findIndex(element => element.id === idGen) !== -1) idGen++;

  // const newPlaylist = {
  //   id: idGen,
  //   name: req.body.name,
  //   author: req.body.author,
  //   songs: req.body.songs,
  // };

  // if (Object.values(newPlaylist).some(element => !element)) {
  //   idGen = idGenInit;
  //   res.status(400).send(error.caption + error.message.alertOnMissingAttributes("playlist"));
  // } else {
  //   playlists.push(newPlaylist);
  //   res.status(201).json(newPlaylist);
  // }
}

async function update(req, res, next) {

  // WIP

  // let index = playlists.findIndex(element => element.id === +req.params.id);

  // if (playlists[index]) {
  //   playlists[index] = {
  //     id: +req.params.id,
  //     name: req.body.name,
  //     author: req.body.author,
  //     songs: req.body.songs,
  //   };
  //   res.status(204).end();
  // } else res.status(404).send(error.caption + error.message.playlists[0]);
}

async function remove(req, res, next) {
  await Playlist.findByIdAndDelete(req.params.id)
    .then(doc => {
      if (doc) return res.status(204).end();
      return res.status(404).json({ erro: "Playlist não encontrada" });
    })
    .catch(err => res.status(500).json(err.message));
}

module.exports = { showAll, show, create, update, remove };
