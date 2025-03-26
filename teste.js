class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

function salvarUsuario(input) {
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

  user.save(input);
}

try {
  salvarUsuario({});
} catch (error) {
  if (error instanceof ReferenceError) {
    throw error;
  }
  if (error instanceof ValidationError) {
    console.log(error.statusCode);
    return;
  }
  console.log("Erro desconhecido");
  console.log(error.stack);
}
