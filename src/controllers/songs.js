const { ObjectId } = require("bson");
const Song = require("../models/songModel");
const { mandatoryField } = require("../misc/validationMessages");

const filterOut__v = require("../misc/filterOut__v");

async function showAllOrFilter(req, res) {
  if (Object.keys(req.query).length) {
    if (req.query.name && req.query.artist) {
      await Song.findOne({ name: req.query.name, artist: req.query.artist })
        .select(filterOut__v)
        .then(doc => {
          if (doc) return res.status(200).json(doc);
          return res.status(404).json({ erro: "Música não encontrada" });
        })
        .catch(err => res.status(500).json(err.message));
    } else {
      const dbQuery = req.query.name ? { name: req.query.name } : { artist: req.query.artist };
  
      await Song.find(dbQuery)
        .select(filterOut__v)
        .then(doc => {
          if (doc.length) return res.status(200).json(doc);
  
          const errorMessage = req.query.name ? "Música não encontrada" : "Artista especificado não encontrado";  //
  
          return res.status(404).json({ erro: errorMessage });
        })
        .catch(err => res.status(500).json(err.message))
    }
  } else {
    await Song.find()
    .select(filterOut__v)
    .then(doc => {
      if (doc.length) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Não há músicas disponíveis" });  //
    })
    .catch(err => res.status(500).json(err.message));
  }
}

async function show(req, res) {
  await Song.findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {
      if (doc) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Música não encontrada" });   //
    })
    .catch(err => res.status(500).json(err.message));   //
}

async function create(req, res) {
  if (!req.isAdmin) return res.status(401).json({ error: "Acesso não autorizado" });

  const song = new Song(req.body);

  await song.save()
    .then(async doc => res.status(201).json(await Song.findById(doc._id).select(filterOut__v)))
    .catch(err => {
      if (err.errors) {
        const errorMessage = {};

        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        return res.status(422).json(errorMessage);
      }

      if (err.code === 11000) {
        const fields = Object.keys(err.keyValue);
        return res.status(400).json({ erro: `Já consta um registro no sistema para ${req.body[fields[0]]} - ${req.body[fields[1]]}` });
      }

      return res.status(500).json(err.message);
    })
}

async function update(req, res) {
  if (!req.isAdmin) return res.status(401).json({ error: "Acesso não autorizado" });

  const model = { name: req.body.name, artist: req.body.artist };

  Song.findByIdAndUpdate(req.params.id, model, { runValidators: true })
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
      return res.status(404).json({ erro: "Música não encontrada" });   //
    })
    .catch(err => {

      if (req.params.id.length !== 24 || err.name === "CastError") {
        const badRequestMessage = {};

        if (req.params.id.length !== 24)
          badRequestMessage.erro = "Sintaxe de ID inválida"
        else {
          badRequestMessage[
            err.path
          ] = `Tipo do valor inserido (${err.valueType}) não corresponde ao esperado (${err.kind})`;
        }

        return res.status(400).json(badRequestMessage);
      }

      if (err.code === 11000) {
        const fields = Object.keys(err.keyValue);
        return res
          .status(422)
          .json({
            erro: `Já consta um registro no sistema para ${
              req.body[fields[0]]
            } - ${req.body[fields[1]]}`,
          });
      }

      return res.status(500).json(err.message);
    });
}

async function remove(req, res) {
  if (!req.isAdmin) return res.status(401).json({ error: "Acesso não autorizado" });

  Song.findByIdAndDelete(req.params.id)
    .then(doc => {
      if (doc) return res.status(204).end();
      return res.status(404).json({ erro: "Música não encontrada" });  //
    })
    .catch(err => res.status(500).json(err.message));
}

module.exports = { showAllOrFilter, show, create, update, remove };