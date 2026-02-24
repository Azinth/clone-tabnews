import database from "infra/database.js";

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

const user = {
  async save(input) {
    await database.query({
      text: `
        INSERT INTO users (name, username, age)
        VALUES ($1, $2, $3)
      `,
      values: [input.name, input.username, input.age],
    });
  },
};

async function salvarUsuario(input) {
  if (!input) {
    throw new ReferenceError("É necessário enviar o 'input'.");
  }

  if (!input.name) {
    throw new ValidationError("Preencha o seu nome completo");
  }
  if (!input.username) {
    throw new ValidationError("É necessário informar o apelido");
  }

  if (!input.age) {
    throw new ValidationError("Preecha a idade.");
  }

  await user.save(input);
}

async function run() {
  try {
    await salvarUsuario({});
  } catch (error) {
    if (error instanceof ReferenceError) {
      throw error;
    }
    if (error instanceof ValidationError) {
      console.log(error.statusCode);
    } else {
      console.log("Erro desconhecido");
      console.log(error.stack);
    }
  }
}

run();