const prisma = require("../../shared/prisma");

function list() {
  return prisma.carro.findMany();
}

function getById(id) {
  return prisma.carro.findUnique({ where: { id } });
}

function create(data) {
  return prisma.carro.create({ data });
}

function update(id, data) {
  return prisma.carro.update({ where: { id }, data });
}

function remove(id) {
  return prisma.carro.delete({ where: { id } });
}

module.exports = { list, getById, create, update, remove };