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
  // [corrigido] faltava checar se o carro existe antes de remover -- sem isso,
  // apagar um id inexistente vazava o erro cru do Prisma (P2025) em vez de um
  // 404 tratado, igual os outros módulos já fazem.
  await getById(id);
  return carroRepository.remove(id);
}

module.exports = { list, getById, create, update, remove };
