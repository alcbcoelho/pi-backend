const { User } = require("../classes/User");
const { users, error } = require("../data");

let idGen = 0;

function showAll(req, res, next) {
  if (req.query.username) {
    const user = users.find(element => element.username === req.query.username);

    if (user) res.status(200).json(user);
    else res.status(404).send(error.caption + error.message.users[0]);
  } else {
    users.length && res.status(200).json(users);
    res.status(404).send(error.caption + error.message.users[1]);
  }
}

function show(req, res, next) {
  const user = users.find(element => element.id === +req.params.id);

  user && res.status(200).json(user);
  res.status(404).send(error.caption + error.message.users[0]);
}

function create(req, res, next) {
  try {
    if (users.find(element => element.username === req.body.username))
      throw error.caption + error.message.username[0];

    idGen++;

    while (users.findIndex(element => element.id === idGen) !== -1) idGen++;

    users.push(
      new User(
        idGen,
        req.body.username,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
        req.body.email
      )
    );
    res.status(201).json(users[users.length - 1]);
  } catch (e) {
    res.status(400).send(e);
  }
}

function update(req, res, next) {
  try {
    if (users.find(element => element.username === req.body.username))
      throw error.caption + error.message.username[0];
      
    let index = users.findIndex(element => element.id === +req.params.id);

    if (users[index]) {
      users[index] = new User(
        +req.params.id,
        req.body.username,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
        req.body.email
      );
      res.status(204).end();
    } else res.status(404).send(error.caption + error.message.users[0]);
  } catch (e) {
    res.status(400).send(e);
  }
}

function remove(req, res, next) {
  const index = users.findIndex(element => element.id === +req.params.id);

  if (users[index]) {
    const userId = users[index].id;
    users.splice(index, 1);
    res
      .status(200)
      .send(
        `Usuário de <b><span style="color: #ff0000;">ID #${userId}</span></b> removido com sucesso.`
      );
    // res.status(204).end();
  }
  res.status(404).send(error.caption + error.message.users[0]);
}

module.exports = { showAll, show, create, update, remove };

/*

TODO:

- implementar unicidade do username/email (se tentar dar um POST com um nome de usuário já disponível, dar um erro);
?- implementar 
*/
