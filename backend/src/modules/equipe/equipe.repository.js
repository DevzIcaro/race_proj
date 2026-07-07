const prisma = require("../../shared/prisma");

function list() {
  return prisma.equipe.findMany();
}

function getById(id) {
  return prisma.equipe.findUnique({ where: { id } });
}

function create(data) {
  return prisma.equipe.create({ data });
}

function update(id, data) {
  return prisma.equipe.update({ where: { id }, data });
}

function remove(id) {
  return prisma.equipe.delete({ where: { id } });
}

module.exports = { list, getById, create, update, remove };
