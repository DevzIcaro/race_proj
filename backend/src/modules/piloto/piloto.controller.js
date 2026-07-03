const pilotoService = require("./piloto.service");

async function list(req, res) {
  const pilotos = await pilotoService.list();
  res.json(pilotos);
}

async function getById(req, res) {
  const { id } = req.params;
  const piloto = await pilotoService.getById(id);
  res.json(piloto);
}

async function create(req, res) {
  const piloto = await pilotoService.create(req.body);
  res.status(201).json(piloto);
}

async function update(req, res) {
  const { id } = req.params;
  const piloto = await pilotoService.update(id, req.body);
  res.json(piloto);
}

async function remove(req, res) {
  const { id } = req.params;
  await pilotoService.remove(id);
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove  };
