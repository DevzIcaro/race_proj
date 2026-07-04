const pilotoService = require("./piloto.service");

async function list(req, res) {
  const pilotoList = await pilotoService.list();
  res.json(pilotoList);
}

async function getById(req, res) {
  const { id } = req.params;
  const piloto = await pilotoService.getById(id);
  res.status(201).json(piloto);
}

async function create(req, res) {
  const pilotoCreate = await pilotoService.create(req.body);
  res.json(pilotoCreate);
}

async function update(req, res) {
  const { id } = req.params;
  const pilotoUpdate = await pilotoService.update(id, req.body);
  res.json(pilotoUpdate);
}

async function remove(req, res) {
  const { id } = req.params;
  await pilotoService.remove(id);
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
