const prisma = require("../../shared/prisma")

function list(){
    return prisma.corrida.findMany();
}

function getById(id){
    return prisma.corrida.findUnique({where: {id}});
}

function create(data){
    return prisma.corrida.create({data});
}

function update(id, data){
    return prisma.corrida.update({where: {id}, data});
}

function remove(id){
    return prisma.corrida.remove({where:{id}});
}

module.exports = {list, getById, create, update, remove}