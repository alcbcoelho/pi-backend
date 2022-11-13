// const { User } = require("../classes/User");
// const { users, error } = require("../data");

const { ObjectId } = require("bson");
const User = require("../models/userModel");

let idGen = 0;

async function showAll(req, res, next) {
  await User.find()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json(err));
}

async function show(req, res, next) {
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  await User.findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {
      doc && res.status(200).json(doc);
      res.status(404).json("Usuário não localizado."); // REFATORAR
    })
    .catch(err => res.status(500).json(err)); //
}

async function create(req, res, next) {
  const user = new User(req.body);

  await user
    .save()
    .then(doc => {
      doc.password = undefined;
      return res.status(201).json(doc);
    })
    .catch(err => {
      const errorMessage = {};

      if (err.errors) {
        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        // res.status(422).json(errorMessage);
      }

      if (err.code === 11000) {
        const registeredField = Object.keys(err.keyValue)[0];
        errorMessage[registeredField] = `Já há um usuário registrado no sistema com o ${registeredField} '${req.body[registeredField]}'.`;  //
      }

      res.status(422).json(errorMessage);
    });
}

async function update(req, res, next) {
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  const model = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email
  }
  
  await User.findOneAndUpdate({ _id: ObjectId(req.params.id) }, model, {
    runValidators: true,
  })
    .then(doc => {
      doc && res.status(204).end();
      res.status(404).json("Usuário não localizado"); // REFATORAR
    })
    .catch(err => {
      // --- REFATORAR
      const errorMessage = {};

      if (err.errors) {
        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        res.status(422).json(errorMessage);
      }

      if (err.code === 11000) {
        const registeredField = Object.keys(err.keyValue)[0];
        errorMessage[registeredField] = `Já há um usuário registrado no sistema com o ${registeredField} '${req.body[registeredField]}'.`;  //
        res.status(422).json(errorMessage);
      }
      // ---

      if (Object.keys(req.body).some((value, index) => value !== Object.keys(model)[index])) {
        const fields = Object.keys(model);
        errorMessage.erro = `Campos informados não correspondem - parcial ou totalmente - aos esperados: ${Object.keys(model).join("; ")}.`
        res.status(400).json(errorMessage); //
      }

      res.status(500).json(err);
    });
}

async function remove(req, res, next) {
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  User.findOneAndDelete({ _id: ObjectId(req.params.id) })
    .then(doc => {
      doc && res.status(204).end();
      res.status(404).json("Usuário não localizado."); // REFATORAR
    })
    .catch(err => res.status(500).json(err)); //
}

module.exports = { showAll, show, create, update, remove };
