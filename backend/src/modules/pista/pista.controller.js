const pistaService = require("./pista.service");

async function list(req, res) {
  const pistaList = await pistaService.list();
  res.json(pistaList);
}
async function getById(req, res) {
  const { id } = req.params;
  const pista = await pistaService.getById(id);
  res.json(pista);
}

async function create(req, res) {
  const pistaCreate = await pistaService.create(req.body);
  res.status(201).json(pistaCreate);
}

async function update(req, res) {
  const { id } = req.params;
  const pistaUpdate = await pistaService.update(id, req.body);
  res.json(pistaUpdate);
}

async function remove(req, res) {
  const { id } = req.params;
  await pistaService.remove(id);
  res.status(204).send();
}

module.exports = {list, getById, create, update, remove};
