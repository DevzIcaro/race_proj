const prisma = require("../../shared/prisma")

const prisma = {PrismaClient}

function list(){
    return prisma.pessoa.findMany();
}

function getById(id){
    return prisma.pessoa.findUnique({where:{id}});
}

function create(data){
    return prisma.pessoa.create({data});
}

function update(id, data){
    return prisma.pessoa.update({where:{id}, data});
}

function remove(id){
    return prisma.pessoa.remove({where:{id}});
}

module.exports = {list, getById, create, update, remove};