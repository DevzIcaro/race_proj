const authService = require("./auth.service");

async function login(req, res) {
  const { email, senha} = req.body;

  const login = await authService.login(email, senha);

  const { id, nome } = login;
  const loginSemSenha = { id, nome, email };

  res.json(loginSemSenha);
}


module.exports = {login};