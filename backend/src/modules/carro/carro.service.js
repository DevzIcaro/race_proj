const carroRepository = require("./carro.repository");

async function list() {
  return carroRepository.list();
}

async function getById(id) {
  const carro = await carroRepository.getById(id);
  if (!carro) {
    const error = new Error("Carro não é encontrado");
    error.status = 404;
    throw error;
  }
  return carro;
}

async function create(data) {
  return carroRepository.create(data);
}

async function update(id, data) {
  return carroRepository.update(id, data);
}

async function remove(id) {
  await getById(id);
  return carroRepository.remove(id);
}

module.exports = { list, getById, create, update, remove };
