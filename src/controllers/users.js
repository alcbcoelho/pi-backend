const { ObjectId } = require("bson");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env.json");
const User = require("../models/userModel");
const { mandatoryField } = require("../validationMessages");

//

function generateToken(doc) {
  return jwt.sign({ _id: ObjectId(doc._id), isAdmin: doc.isAdmin }, config.tokenSecret)
}

async function removeUser(req, res, id) {
  return await User.findByIdAndDelete(id)
  .then(doc => {
    if (doc) return res.status(204).end();
    if (id === req.userId) return res.status(401).json({ erro: "Acesso não autorizado" }); // REFATORAR
    return res.status(404).json({ erro: "Usuário não encontrado" });  // REFATORAR
  })
}

//

async function showAll(req, res) {
  if (req.query.username) {
    await User.findOne({ username: req.query.username })
      .then(doc => {
        if (doc) return res.status(200).json(doc);
        return res.status(404).json({ erro: "Usuário não encontrado." });  // REFATORAR
      })
      .catch(err => res.status(500).json(err.message));   //
  } else {
    await User.find()
      .then(doc => {
        if (doc.length) return res.status(200).json(doc);
        return res.status(404).json({ erro: "Não há usuários disponíveis." });   //
      })
      .catch(err => res.status(500).json(err.message));
  }
}

async function show(req, res) {
  await User.findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {
      if (doc) return res.status(200).json(doc);
      return res.status(404).json({ erro: "Usuário não encontrado." }); // REFATORAR
    })
    .catch(err => {
      // 400 - BAD REQUEST
      if (req.params.id.length !== 24) return res.status(400).json({ erro: "Sintaxe de ID inválida." });  // TODO: RESOLVER

      // 500 - INTERNAL SERVER ERROR
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
        token: /* jwt.sign({ _id: ObjectId(doc._id), isAdmin: doc.isAdmin }, config.tokenSecret) */ generateToken(doc)
      }

      doc.password = undefined;
      // doc.isAdmin = undefined;
      
      return res.status(201).json(successfulRegistration);
    })
    .catch(err => {
      
      if (err.errors) {
        const errorMessage = {};
        
        Object.values(err.errors).forEach(modelField => (errorMessage[modelField.properties.path] = modelField.properties.message));
        return res.status(422).json(errorMessage);  // TODO: criar uma função p/ esse tratamento de erro e importar p/ os 3 controllers
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

        return res.status(422).json({ erro: `Já há um usuário registrado no sistema com o ${registeredFieldPT} ${req.body[registeredField]}.` });
        // TODO: Usar o setter de telefone p/ formatar o valor do telefone na mensagem acima ^
      }

      return res.status(500).json(err.message);
    });
}

async function authenticate(req, res) {
  const { username, password } = req.body;

  await User.findOne({ username })
    .select({ password: 1, isAdmin: 1 })
    .then(async doc => {
      if (!doc) return res.status(404).json({ erro: "Usuário não cadastrado."});

      if (!(await bcrypt.compare(password, doc.password))) return res.status(401).json({ erro: "Senha incorreta." });

      const successfulLoginMessage = {
        message: "Login efetuado com sucesso",
        user: await User.findById(doc._id).select({ createdAt: 0, updatedAt: 0, __v: 0 }),
        token: /* jwt.sign({ _id: ObjectId(doc._id), isAdmin: doc.isAdmin }, config.tokenSecret) */ generateToken(doc)
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
      return res.status(422).json(errorMessage);  // TODO: criar uma função p/ esse tratamento de erro e importar p/ os 3 controllers
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

      return res.status(422).json({ erro: `Já há um usuário registrado no sistema com o ${registeredFieldPT} ${req.body[registeredField]}.` });
      // TODO: Usar o setter de telefone p/ formatar o valor do telefone na mensagem acima ^
    }

    return res.status(500).json(err.message);
  }
}

async function updateById(req, res) {
  if (!req.isAdmin) return res.status(401).json({ erro: "Acesso não autorizado" });  //

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
            user: { _id, username, isAdmin } /* User.findById(doc._id).select({ isAdmin: 1, createdAt: 0, updatedAt: 0, __v: 0 }) */,
            token: generateToken(doc)
          }

          return res.json(successfulUpdate);
        }
      
        values.forEach((field, index) => {
          if (!field) errorMessage[fields[index]] = mandatoryField();
        });
      
        return res.status(422).json(errorMessage);
      }
      return res.status(404).json({ erro: "Usuário não encontrado" });  //
    })
    .catch(err => {
      // console.log(err); //

      // TODO: TENTAR RESOLVER DISPLAY DE ERRO DE VALIDAÇÃO
      // "Validation failed: password: Senha deve conter no mínimo 6 caracteres."

      // 400 - BAD REQUEST
      if (req.params.id.length !== 24 || err.name === "CastError") {
        const badRequestMessage = {};

        if (req.params.id.length !== 24)
          badRequestMessage.erro = "Sintaxe de ID inválida.";
        else {
          badRequestMessage[
            err.path
          ] = `Tipo do valor inserido (${err.valueType}) não corresponde ao esperado (${err.kind}).`;
        }

        return res.status(400).json(badRequestMessage);
      } // refatorar
      
      // 422 - UNPROCESSABLE ENTITY
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

        errorMessage.erro = `Já há um usuário registrado no sistema com o ${registeredFieldPT} ${req.body[registeredField]}.`; //
        return res.status(422).json(errorMessage);
        // TODO: Usar o setter de telefone p/ formatar o valor do telefone na mensagem acima ^
      }

      // 500 - INTERNAL SERVER ERROR
      return res.status(500).json(err.message);
    });
}

async function remove(req, res) {
  removeUser(req, res, req.userId).catch(err => res.status(500).json(err.message)); //
}

async function removeById(req, res) {
  if (!req.isAdmin) return res.status(401).json({ erro: "Acesso não autorizado" });  //

  removeUser(req, res, req.userId)
    .catch(err => {
      // 400 - BAD REQUEST
      if (req.params.id.length !== 24) return res.status(400).json({ erro: "Sintaxe de ID inválida." });

      // 500 - INTERNAL SERVER ERROR
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
  remove,
  removeById
};