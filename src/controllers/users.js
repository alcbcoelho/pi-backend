const { ObjectId } = require("bson");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env.json");
const User = require("../models/userModel");
const { mandatoryField } = require("../misc/validationMessages");

//

function generateToken(doc) {
  return jwt.sign({ _id: ObjectId(doc._id), isAdmin: doc.isAdmin }, config.tokenSecret)
}

//

async function showAll(req, res) {
  if (req.query.username) {
    await User.findOne({ username: req.query.username })
      .then(doc => {
        if (doc) return res.status(200).json(doc);
        return res.status(404).json({ erro: "Usuário não encontrado" });
      })
      .catch(err => res.status(500).json(err.message));
  } else {
    await User.find()
      .then(doc => {
        if (doc.length) return res.status(200).json(doc);
        return res.status(404).json({ erro: "Não há usuários disponíveis" });
      })
      .catch(err => res.status(500).json(err.message));
  }
}

async function show(req, res) {
  await User.findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {
      if (doc) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Usuário não encontrado" });
    })
    .catch(err => {
      if (req.params.id.length !== 24) return res.status(400).json({ erro: "Sintaxe de ID inválida" });

      return res.status(500).json(err.message)
    }); //
}

async function register(req, res) {
  const user = new User(req.body);

  await user
    .save()
    .then(doc => {
      const { _id, username, firstName, lastName, phone, email } = doc;
      const successfulRegistration = {
        message: "Registro efetuado com sucesso",
        user: { _id, username, firstName, lastName, phone, email },
        token: generateToken(doc)
      }

      doc.password = undefined;
      
      return res.status(201).json(successfulRegistration);
    })
    .catch(err => {
      
      if (err.errors) {
        const errorMessage = {};
        
        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        return res.status(422).json(errorMessage);
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

        return res.status(400).json({ erro: `Já há um usuário registrado no sistema com o ${registeredFieldPT} ${req.body[registeredField]}` });
      }

      return res.status(500).json(err.message);
    });
}

async function authenticate(req, res) {
  const { username, password } = req.body;

  await User.findOne({ username })
    .select({ password: 1, isAdmin: 1 })
    .then(async doc => {
      if (!doc) return res.status(404).json({ erro: "Usuário não cadastrado"});

      if (!(await bcrypt.compare(password, doc.password))) return res.status(401).json({ erro: "Senha incorreta" });

      const successfulLoginMessage = {
        message: "Login efetuado com sucesso",
        user: await User.findById(doc._id).select({ createdAt: 0, updatedAt: 0, __v: 0 }),
        token: generateToken(doc)
      }
      
      return res.json(successfulLoginMessage);
    })
    .catch(err => res.status(500).json(err.message));
}

async function update(req, res) {
  try {
    const targettedUser = await User.findOne({ _id: ObjectId(req.userId) }).select({
      username: 1,
      password: 1,
      firstName: 1,
      lastName: 1,
      phone: 1,
      email: 1
    });

    const fields = Object.keys(targettedUser.toObject());
    fields.shift();

    for (let i = 0; i < fields.length; i++) {
      targettedUser[fields[i]] = req.body[fields[i]];
    }
    
    await targettedUser.save();
    res.status(204).end();
  } catch (err) {
    if (err.errors) {
      const errorMessage = {};
      
      Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
      return res.status(422).json(errorMessage);
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

      return res.status(400).json({ erro: `Já há um usuário registrado no sistema com o ${registeredFieldPT} ${req.body[registeredField]}` });
    }

    return res.status(500).json(err.message);
  }
}

async function updateById(req, res) {
  if (!req.isAdmin) return res.status(401).json({ erro: "Acesso não autorizado" });

  const model = { isAdmin: req.body.isAdmin };
  
  await User.findByIdAndUpdate(req.params.id, model, {
    runValidators: true
  })
    .then(doc => {
      if (doc) {
        const errorMessage = {};
        const fields = Object.keys(model);
        const values = Object.values(model);
      
        if (values.every(field => field)) {
          const { _id, username, isAdmin } = doc;
          const successfulUpdate = {
            message: "Status de administrador atualizado com sucesso",
            user: { _id, username, isAdmin },
            token: generateToken(doc)
          }

          return res.json(successfulUpdate);
        }
      
        values.forEach((field, index) => {
          if (!field) errorMessage[fields[index]] = mandatoryField();
        });
      
        return res.status(422).json(errorMessage);
      }
      return res.status(404).json({ erro: "Usuário não encontrado" });
    })
    .catch(err => {
      if (req.params.id.length !== 24 || err.name === "CastError") {
        const badRequestMessage = {};

        if (req.params.id.length !== 24)
          badRequestMessage.erro = "Sintaxe de ID inválida";
        else {
          badRequestMessage[
            err.path
          ] = `Tipo do valor inserido (${err.valueType}) não corresponde ao esperado (${err.kind})`;
        }

        return res.status(400).json(badRequestMessage);
      }
      
      if (err.code === 11000) {
        const errorMessage = {};
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

        errorMessage.erro = `Já há um usuário registrado no sistema com o ${registeredFieldPT} ${req.body[registeredField]}`; //
        return res.status(400).json(errorMessage);
      }

      return res.status(500).json(err.message);
    });
}

async function remove(req, res) {
  if (!req.isAdmin) return res.status(401).json({ erro: "Acesso não autorizado" });

  if (req.params.id === req.userId) return res.status(403).json({ erro: "Não é permitido deletar a própria conta" });

  if ((await User.findById(req.params.id).select({ isAdmin: 1 })).isAdmin) return res.status(403).json({ erro: "Não é permitido deletar a conta de outro administrador" });

  await User.findByIdAndDelete(req.params.id)
  .then(doc => {
    if (doc) return res.status(204).end();
    return res.status(404).json({ erro: "Usuário não encontrado" });
  })
    .catch(err => {
      if (req.params.id.length !== 24) return res.status(400).json({ erro: "Sintaxe de ID inválida" });

      return res.status(500).json(err.message)
    });
}

module.exports = {
  showAll,
  show,
  register,
  authenticate,
  update,
  updateById,
  remove
};