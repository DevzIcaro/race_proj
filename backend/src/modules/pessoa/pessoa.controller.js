const pessoaService = require("./pessoa.service");

async function list(req, res) {
  const pessoaList = await pessoaService.list();
  res.json(pessoaList);
}

async function getById(req, res) {
  const { id } = req.params;
  const pessoa = await pessoaService.getById(id);
  res.json(pessoa);
}

async function create(req, res) {
  const pessoaCreate = await pessoaService.create(req.body);
  res.status(201).json(pessoaCreate);
}

async function update(req, res) {
  const { id } = req.params;
  const pessoaUpdate = await pessoaService.update(id, req.body);
  res.json(pessoaUpdate);
}

async function remove(req, res) {
  const { id } = req.params;
  await pessoaService.remove(id);
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
