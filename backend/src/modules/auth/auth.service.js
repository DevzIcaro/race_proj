const pessoaService = require("../pessoa/pessoa.service");
const bcrypt = require("bcrypt");

async function login(email, senha) {
  const pessoaAuth = await pessoaService.getByEmail(email);
  const compare = await bcrypt.compare(senha, pessoaAuth.senha);

  if (!compare) {
    const error = new Error("credenciais inválidas.");
    error.status = 401;
    throw error;
  }

  return pessoaAuth;
}


module.exports = {login};