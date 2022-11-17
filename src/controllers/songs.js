const { ObjectId } = require("bson");
const Song = require("../models/songModel");
const { mandatoryField } = require("../validationMessages");

/* function generateErrorIfAlreadyRegistered(req, res, err) {
  if (err?.code === 11000) {
    const fields = Object.keys(err.keyValue);
    return res.status(422).json({ erro: `Já consta um registro no sistema para '${req.body[fields[0]]} - ${req.body[fields[1]]}'.` });
  }
  // dando erro: 'ERR_HTTP_HEADERS_SENT' *shrug*
  // esquecer por hora
} */

async function showAllOrFilter(req, res, next) {
  // TODO: ver se é possível implementar filtro sem case sensitive
  if (req.query.name && req.query.artist) {
    await Song.findOne({ name: req.query.name, artist: req.query.artist })
    // dando erro: 'ERR_HTTP_HEADERS_SENT' *shrug*
      .then(doc => {
        if (doc) return res.status(200).json(doc);
        return res.status(404).json({ erro: "Música não encontrada." });
      })
      .catch(err => res.status(500).json(err));
  }

  if (req.query.name || req.query.artist) {
    const dbQuery = req.query.name ? { name: req.query.name } : { artist: req.query.artist };

    await Song.find(dbQuery)
    // dando erro: 'ERR_HTTP_HEADERS_SENT' *shrug*
      .then(doc => {
        if (doc.length) return res.status(200).json(doc);

        const errorMessage = req.query.name ? "Música não encontrada." : "Artista especificado não encontrado.";  //

        return res.status(404).json({ erro: errorMessage });
      })
      .catch(err => res.status(500).json(err))
  }

  await Song.find()
    .then(doc => {
      if (doc.length) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Não há músicas disponíveis." });  //
    })
    .catch(err => res.status(500).json(err));
}

async function show(req, res, next) {
  await Song.findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {
      if (doc) return res.status(200).json(doc);
      return res.status(404).json("Música não encontrada.");   //
    })
    .catch(err => res.status(500).json(err));   //
}

async function create(req, res, next) {
  const song = new Song(req.body);

  await song.save()
    .then(doc => res.status(201).json(doc))
    .catch(err => {
      if (err.errors) {
        const errorMessage = {};

        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        return res.status(422).json(errorMessage);
      }

      if (err.code === 11000) {
        const fields = Object.keys(err.keyValue);
        return res.status(422).json({ erro: `Já consta um registro no sistema para ${req.body[fields[0]]} - ${req.body[fields[1]]}.` });
      } // refatorar
      // generateErrorIfAlreadyRegistered(req, res, err);
      return res.status(500).json(err);
    })
}

async function update(req, res, next) {
  const model = { name: req.body.name, artist: req.body.artist };

  Song.findOneAndUpdate({ _id: ObjectId(req.params.id) }, model, { runValidators: true })
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
      return res.status(404).json({ erro: "Música não encontrada." });   //
    })
    .catch(err => {
      if (err.code === 11000) {
        const fields = Object.keys(err.keyValue);
        return res.status(422).json({ erro: `Já consta um registro no sistema para ${req.body[fields[0]]} - ${req.body[fields[1]]}.` });
      } // refatorar
      // generateErrorIfAlreadyRegistered(req, res, err);

      return res.status(500).json(err);
    });
}

async function remove(req, res, next) {
  Song.findOneAndDelete({ _id: ObjectId(req.params.id) })
    .then(doc => {
      if (doc) return res.status(204).end();
      return res.status(404).json({ erro: "Música não encontrada." });  //
    })
    .catch(err => res.status(500).json(err));
}

module.exports = { showAllOrFilter, show, create, update, remove };