const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Nome de usuário é obrigatório"],
    trim: true,
    minLength: [3, "Nome de usuário deve conter no mínimo 3 caracteres"],
    maxLength: [20, "Nome de usuário deve conter no máximo 20 caracteres"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
    trim: true,
    minLength: [6, "Senha deve conter no mínimo 6 caracteres"],
    select: false
  },
  firstName: {
    type: String,
    required: [true, "Nome é obrigatório"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Sobrenome é obrigatório"],
    trim: true
  },
  phone: {
    type: Number,
    min: [12, "Número de dígitos inválido"],
    max: [13, "Número de dígitos inválido"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Endereço de email é obrigatório"],
    trim: true,
    unique: true
  },
});

module.exports = mongoose.model("User", userSchema);
