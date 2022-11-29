const { ObjectId } = require("bson");
const Playlist = require("../models/playlistModel");
const { mandatoryField } = require("../validationMessages");

const filterOut__v = require("../misc/filterOut__v");
const populateOptions = { path: "author songs", select: "username name artist" };

async function showAll(req, res) {
  await Playlist.find()
  .populate(populateOptions)
  .select(filterOut__v)
  .then(doc => {
    if (doc.length) return res.status(200).json(doc);
    return res.status(404).json({ erro: "Não há playlists disponíveis." });   //
  })
  .catch(err => res.status(500).json(err.message));
}

async function show(req, res) {
  await Playlist.findOne({ _id: ObjectId(req.params.id) })
    .populate(populateOptions)
    .select(filterOut__v)
    .then(doc => {
      if (doc) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Playlist não encontrada." });
    })
    .catch(err => res.status(500).json(err.message));
}

async function create(req, res) {
  const playlist = new Playlist({
    name: req.body.name,
    author: req.userId,
    songs: req.body.songs
  });

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

async function update(req, res) {
  // REFATORAR V
  const author = await Playlist.findById(req.params.id).then(doc => doc.author);
  const isPlaylistOwner = (req.userId != author) ? false : true;
  
  if (!isPlaylistOwner && !req.isAdmin) return res.status(401).json({ erro: "Acesso não autorizado" });
  // REFATORAR ^
  
  const model = {
    name: req.body.name,
    author,
    songs: req.body.songs
  };

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

async function remove(req, res) {
  // REFATORAR V
  const author = await Playlist.findById(req.params.id).then(doc => doc.author);
  const isPlaylistOwner = (req.userId != author) ? false : true;

  if (!isPlaylistOwner && !req.isAdmin) return res.status(401).json({ erro: "Acesso não autorizado" });
  // REFATORAR ^

  await Playlist.findByIdAndDelete(req.params.id)
    .then(doc => {
      if (doc) return res.status(204).end();
      return res.status(404).json({ erro: "Playlist não encontrada." });
    })
    .catch(err => res.status(500).json(err.message));
}

module.exports = { showAll, show, create, update, remove };