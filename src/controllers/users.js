const usuarios = [
  {
    id: 1,
    username: "u1",
    FirstName: "José",
    lastName: "Fernando",
    password: "123456",
    phone: "98478-7786",
    email: "josefernando@teste.com",
  },
  {
    id: 2,
    username: "u2",
    FirstName: "Maria",
    lastName: "Cristina",
    password: "123456",
    phone: "96778-7895",
    email: "mariacristina@teste.com",
  },
  {
    id: 3,
    username: "u3",
    FirstName: "Mario",
    lastName: "José",
    password: "123456",
    phone: "98125-7741",
    email: "mariojose@teste.com",
  },
  {
    id: 4,
    username: "u4",
    FirstName: "Alice",
    lastName: "Sousa",
    password: "123456",
    phone: "98591-2831",
    email: "alice@teste.com",
  },
  {
    id: 5,
    username: "u5",
    FirstName: "Leonardo",
    lastName: "Pires",
    password: "123456",
    phone: "98255-6586",
    email: "leonardopires@teste.com",
  },
  {
    id: 6,
    username: "u6",
    FirstName: "Claudia",
    lastName: "Freitas",
    password: "123456",
    phone: "98442-2233",
    email: "claudiafreitaso@teste.com",
  },
  {
    id: 7,
    username: "u7",
    FirstName: "Maria",
    lastName: "Luiza",
    password: "123456",
    phone: "98258-3698",
    email: "malu@teste.com",
  },
  {
    id: 8,
    username: "u8",
    FirstName: "Eduardo",
    lastName: "Rodrigues",
    password: "123456",
    phone: "94563-2597",
    email: "eduardorodrigues@teste.com",
  },
  {
    id: 9,
    username: "u9",
    FirstName: "Carolina",
    lastName: "Freitas",
    password: "123456",
    phone: "91234-4321",
    email: "carolinafreitas@teste.com",
  },
  {
    id: 10,
    username: "u10",
    FirstName: "Beatriz",
    lastName: "Soares",
    password: "123456",
    phone: "98010-2022",
    email: "Beatrizsoares@teste.com",
  },
];

function listar(req, res, next) {
  res.status(200).json(usuarios);
}

function exibir(req, res, next) {
  const usuarioLocalizado = usuarios.find(
    usuario => usuario.id === Number(req.params.id)
  );
  if (!usuarioLocalizado) {
    return res.status(404).json({ msg: "Usuário não localizado" });
  }
  res.json(usuarioLocalizado);
}

function criar(req, res, next) {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
    phone: req.body.phone,
    email: req.body.email,
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
}

function atualizar(req, res, next) {
  const usuarioLocalizado = usuarios.find(
    usuario => usuario.id === Number(req.params.id)
  );
  if (!usuarioLocalizado) {
    return res.status(404).json({ msg: "Usuário não localizado" });
  }
  usuarioLocalizado.nome = req.body.nome;
  usuarioLocalizado.phone = req.body.phone;
  usuarioLocalizado.email = req.body.email;
  res.status(204).end();
}

function remover(req, res, next) {
  const posicaoUsuario = usuarios.findIndex(
    usuario => usuario.id === Number(req.params.id)
  );
  if (posicaoUsuario < 0) {
    return res.status(404).json({ msg: "Usuário não localizado" });
  }
  usuarios.splice(posicaoUsuario, 1);
  res.status(204).end();
}

module.exports = { listar, exibir, criar, atualizar, remover };
