const mongoose = require("mongoose");
const { Schema } = mongoose;

const message = require("../validationMessages");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, message.mandatoryField()],
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
  firstName: {
    type: String,
    required: [true, message.mandatoryField()],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, message.mandatoryField()],
    trim: true,
  },
  phone: {
    type: String,
    set: value => {
      const segments = [];
      let start = 0;
      value = value.replace(/[\s-+]/g, "");

      for (let i = 1; i <= 4; i++)
        if (!(i % 2)) sliceStringIntoSegment(i);
      sliceStringIntoSegment(value.length - 4);
      sliceStringIntoSegment(value.length, false);

      return `+${segments[0]} ${segments[1]} ${segments[2]}-${segments[3]}`;

      //

      function sliceStringIntoSegment(end, overrideStart = true) {
        segments.push(value.slice(start, end));
        if (overrideStart) start = end;
      }
    },
    validate: {
      validator: value => /\+?\d{2}\s?\d{2}\s?\d{4,5}-?\s?\d{4}/.test(value),
      message:
        "Telefone deve conter código do país, seguido do código DDD da região e uma sequência de 8 ou 9 digítos que correspondam ao número telefônico propriamente dito (exemplo: +55 01 91111-1111)."
    }
  },
  email: {
    type: String,
    required: [true, message.mandatoryField()],
    trim: true,
    validate: {
      validator: value => /[\w\d]+@\w+\.\w+/.test(value),
      message: "Endereço de e-mail deve consistir de parte local seguida de arroba (@) e nome do domínio (exemplo: johndoe@dominio.com)."
    }
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
