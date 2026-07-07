const carroRepository = require("./carro.repository");

async function list() {
  return  carroRepository.list();
}

async function getById(id) {
  const carro = carroRepository.getById(id);
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

async function update(id,data){
    return carroUpdate.update(id, data);
}

async function remove(id){
    return carroRemove.remove(id);
}

module.exports = {list, getById, create, update, remove}