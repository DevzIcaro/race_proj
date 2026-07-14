const pessoaService = require("./pessoa.service");

async function list(req, res) {
  const pessoaList = await pessoaService.list();
  const mapPessoaList = pessoaList.map((pessoa) => {
    const { id, nome, email } = pessoa;
    const pessoaListSemSenha = { id, nome, email };

    return pessoaListSemSenha;
  });

  res.json(mapPessoaList);
}

async function getById(req, res) {
  const { id } = req.params;
  const pessoa = await pessoaService.getById(id);
  const { nome, email } = pessoa;
  const pessoaSemSenha = { id, nome, email };
  res.json(pessoaSemSenha);
}

async function create(req, res) {
  const pessoaCreate = await pessoaService.create(req.body);
  const { id, nome, email } = pessoaCreate;
  const pessoaCreateSemSenha = { id, nome, email };
  res.status(201).json(pessoaCreateSemSenha);
}

async function update(req, res) {
  const { id } = req.params;
  const pessoaUpdate = await pessoaService.update(id, req.body);
  const { nome, email } = pessoaUpdate;
  const pessoaUpdateSemSenha = { id, nome, email };
  res.json(pessoaUpdateSemSenha);
}

async function remove(req, res) {
  const { id } = req.params;
  await pessoaService.remove(id);
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
