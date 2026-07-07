// Aqui ficam as lógicas aplicadas a esta pasta (Equivalente a use-cases)

const pilotoRepository = require("./piloto.repository");

async function list() {
  return pilotoRepository.list();
}

async function getById(id) {
  // [corrigido] faltava "await" -- sem ele, "piloto" seria a Promise em si
  // (sempre truthy), e o "if (!piloto)" nunca dispararia.
  const piloto = await pilotoRepository.getById(id);
  if (!piloto) {
    const error = new Error("Piloto não encontrado");
    error.status = 404;
    throw error;
  }

  return piloto;
}

async function create(data) {
  return pilotoRepository.create(data);
}

async function update(id, data) {
  await getById(id);
  return pilotoRepository.update(id, data);
}

async function remove(id) {
  await getById(id);
  return pilotoRepository.remove(id);
}

module.exports = {list, getById, create, update, remove} 