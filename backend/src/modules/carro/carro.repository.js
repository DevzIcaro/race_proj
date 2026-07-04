const carroRepository = require("../../shared/prisma");

function list() {
  return prisma.carro.list();
}

function getById(id) {
  return prisma.carro.getById({ where: { id } });
}

function create(data) {
  return prisma.carro.create({ data });
}

function update(id, data) {
  return prisma.carro.update({ where: { id }, data });
}

function remove(id) {
  return prisma.carro.remove({ where: { id } });
}

module.exports = { list, getById, create, update, remove };