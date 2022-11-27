const { ObjectId } = require("bson");
const Playlist = require("../models/playlistModel");
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
}

async function update(req, res, next) {
  const model = {
    name: req.body.name,
    author: req.body.author,
    songs: req.body.songs
  }

  await Playlist.findByIdAndUpdate(req.params.id, model, { runValidators: true })
    .then(doc => {
      if (doc) {
        const errorMessage = {};
        const fields = Object.keys(model);
        const values = Object.values(model);

        if (values.every(field => field)) return res.status(204).end();

        values.forEach((field, index) => {
          if (!field) errorMessage[fields[index]] = mandatoryField();
        });

        return res.status(422).json(errorMessage);
      }
      return res.status(404).json({ erro: "Playlist não encontrada." });
    })
    .catch(err => {

      // 400 - BAD REQUEST
      if ((req.params.id.length !== 24) || err.name === "CastError") {
        const badRequestMessage = {};
  
        if (req.params.id.length !== 24)
          badRequestMessage.erro = "Sintaxe de ID inválida."
        else {
          badRequestMessage[
            err.path
          ] = `Tipo do valor inserido (${err.valueType}) não corresponde ao esperado (${err.kind}).`;
        }
        
        return res.status(400).json(badRequestMessage);
      }

      // 500 - INTERNAL SERVER ERROR
      return res.status(500).json(err.message);
    });
}

async function remove(req, res, next) {
  await Playlist.findByIdAndDelete(req.params.id)
    .then(doc => {
      if (doc) return res.status(204).end();
      return res.status(404).json({ erro: "Playlist não encontrada." });
    })
    .catch(err => res.status(500).json(err.message));
}

module.exports = { showAll, show, create, update, remove };