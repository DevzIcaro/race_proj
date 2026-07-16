const pessoaService = require("../pessoa/pessoa.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

async function login(email, senha) {
  const pessoaAuth = await pessoaService.getByEmail(email);
  const compare = await bcrypt.compare(senha, pessoaAuth.senha);

  if (!compare) {
    const error = new Error("credenciais inválidas.");
    error.status = 401;
    throw error;
  }


  const token = jwt.sign({id: pessoaAuth.id}, jwtSecret, {expiresIn: "3h"});
  console.log(token);

  const loginJWT = {token, pessoaAuth};

  return loginJWT;
}


module.exports = {login};