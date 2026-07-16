const prisma = require("../../shared/prisma");

function list() {
  return prisma.pessoa.findMany();
}

function getById(id) {
  return prisma.pessoa.findUnique({ where: { id } });
}

function getByEmail(email) {
  return prisma.pessoa.findUnique({ email });
}

function create(data) {
  return prisma.pessoa.create({ data });
}

function update(id, data) {
  return prisma.pessoa.update({ where: { id }, data });
}

function remove(id) {
  return prisma.pessoa.delete({ where: { id } });
}

module.exports = { list, getById, getByEmail, create, update, remove };
