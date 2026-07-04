const prisma = require("../../shared/prisma");

function list() {
  return prisma.pista.findMany();
}

function getById(id) {
  return prisma.pista.findUnique({ where: { id } });
}

function create(data) {
  return prisma.pista.create({data});
}

function update(id, data) {
  return prisma.pista.update({ where: { id }, data });
}

function remove(id) {
  return prisma.pista.remove({ where: { id } });
}

module.exports = { list, getById, create, update, remove };
