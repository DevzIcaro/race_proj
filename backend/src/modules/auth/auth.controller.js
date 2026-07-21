const authService = require("./auth.service");

async function login(req, res) {
  const { email, senha} = req.body;

  const {token, pessoaAuth}  = await authService.login(email, senha);

  const { id, nome } = pessoaAuth;
  const loginSemSenha = { token, id, nome, email };

  res.json(loginSemSenha);
}


module.exports = {login};