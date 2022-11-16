const { ObjectId } = require("bson");
const User = require("../models/userModel");

async function showAll(req, res, next) {
  if (req.query.username) {
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    await User.findOne({ username: req.query.username })
      .then(doc => {
        if (doc) return res.status(200).json(doc);
        return res.status(404).json({ erro: "Usuário não encontrado." });  // REFATORAR
      })
      .catch(err => res.status(500).json(err));   //
  }

  await User.find()
    .then(doc => {
      if (doc.length) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Não há usuários disponíveis." });   //
    })
    .catch(err => res.status(500).json(err));
}

async function show(req, res, next) {
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  await User.findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {
      if (doc) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Usuário não encontrado." }); // REFATORAR
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

      // COLOCAR UMA CONDICIONAL DE ERRO 422 AQUI PARA FONE REPETIDO
    })
    .catch(err => {
      const errorMessage = {};

      if (err.errors) {
        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        // res.status(422).json(errorMessage);
      }

      if (err.code === 11000) {
        const registeredField = Object.keys(err.keyValue)[0];

        let registeredFieldPT;

        switch (registeredField) {
          case "username":
            registeredFieldPT = "nome de usuário";
            break;
          case "phone":
            registeredFieldPT = "telefone";
            break;
          case "email":
            registeredFieldPT = "email";
        }

        errorMessage.erro = `Já há um usuário registrado no sistema com o ${registeredFieldPT} ${req.body[registeredField]}.`;  //
      }

      return res.status(422).json(/* err */errorMessage);
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
    runValidators: true
  })
    .then(doc => {
      doc && res.status(204).end();
      return res.status(404).json({ erro: "Usuário não encontrado" }); // REFATORAR
    })
    .catch(err => {
      // --- REFATORAR
      const errorMessage = {};

      if (err.errors) {
        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        return res.status(422).json(errorMessage);
      }

      if (err.code === 11000) {
        const registeredField = Object.keys(err.keyValue)[0];
        errorMessage[registeredField] = `Já há um usuário registrado no sistema com o ${registeredField} '${req.body[registeredField]}'.`;  //
        return res.status(422).json(errorMessage);
      }
      // ---

      if (Object.keys(req.body).some((value, index) => value !== Object.keys(model)[index])) {
        const fields = Object.keys(model);
        errorMessage.erro = `Campos informados não correspondem - parcial ou totalmente - aos esperados: ${Object.keys(model).join("; ")}.`
        return res.status(400).json(errorMessage); //
      }

      return res.status(500).json(err);
    });
}

async function remove(req, res, next) {
  User.findOneAndDelete({ _id: ObjectId(req.params.id) })
    .then(doc => {
      if (doc) return res.status(204).end();
      return res.status(404).json({ erro: "Usuário não encontrado." }); // REFATORAR
    })
    .catch(err => res.status(500).json(err)); //
}

module.exports = { showAll, show, create, update, remove };