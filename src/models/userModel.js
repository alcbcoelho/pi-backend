const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const message = require("../misc/validationMessages");
const { schema } = require("./songModel");

function capitalizeString(str) {
  function startsWith(i, regex) {
    return i === 0 && (!regex.test(str));
  }

  let capitalizedStr = "";
  
  for (let i = 0; i < str.length; i++) {
    capitalizedStr = (startsWith(i, /^de /i) || str[i - 1] === " ") ? capitalizedStr + str[i].toUpperCase() : capitalizedStr + str[i];
  }

  return capitalizedStr;
}

function formatPhoneNumber(str) {
  const segments = [];
  let start = 0;
  str = str.replace(/[\s-+]/g, "");

  for (let i = 1; i <= 4; i++)
    if (!(i % 2)) sliceStringIntoSegment(i);
  sliceStringIntoSegment(str.length - 4);
  sliceStringIntoSegment(str.length, false);

  return `+${segments[0]} ${segments[1]} ${segments[2]}-${segments[3]}`;

  function sliceStringIntoSegment(end, overrideStart = true) {
    segments.push(str.slice(start, end));
    if (overrideStart) start = end;
  }
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, message.mandatoryField()],
    unique: true,
    trim: true,
    minLength: [3, message.minLength("Nome de usuário", 3)],
    maxLength: [20, message.maxLength("Nome de usuário", 20)],
  },
  password: {
    type: String,
    required: [true, message.mandatoryField()],
    trim: true,
    minLength: [6, message.minLength("Senha", 6)],
    maxLength: [20, message.maxLength("Senha", 20)],
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    select: false
  },
  firstName: {
    type: String,
    required: [true, message.mandatoryField()],
    set: value => value && capitalizeString(value),
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, message.mandatoryField()],
    set: value => value && capitalizeString(value),
    trim: true,
  },
  phone: {
    type: String,
    required: [true, message.mandatoryField()],
    unique: true,
    set: value => value && formatPhoneNumber(value),
    validate: {
      validator: value => /\+?\d{2}\s?\d{2}\s?\d{4,5}-?\s?\d{4}/.test(value),
      message:
        "Telefone deve conter código do país, seguido do código DDD da região e uma sequência de 8 ou 9 digítos que correspondam ao número telefônico propriamente dito (exemplo: +55 01 91111-1111)."
    }
  },
  email: {
    type: String,
    required: [true, message.mandatoryField()],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: value => /[\w\d]+@\w+\.\w+/.test(value),
      message: "Endereço de e-mail deve consistir de parte local seguida de arroba (@) e nome do domínio (exemplo: johndoe@dominio.com)."
    }
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model("User", userSchema);
