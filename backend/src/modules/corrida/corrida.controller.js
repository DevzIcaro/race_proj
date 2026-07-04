const corridaService = require("./corrida.service");

async function list(req, res) {
  const corridas = await corridaService.list();
  res.json(corridas);
}

async function getById(req, res) {
  const { id } = req.params;
  const corrida = await corridaService.getById(id);
  res.json(corrida);
}

async function create(req, res) {
  const corridaCreate = await corridaService.create(req.body);
  res.json(corridaCreate);
}

async function update(req, res) {
  const { id } = req.params;
  const corridaUpdate = await corridaService.update(id, req.body);
  res.json(corridaUpdate);
}

async function remove(req, res) {
  const { id } = req.params;
  await corridaService.remove(id);
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
