const prisma = require("../../shared/prisma")

function list(){
    return prisma.inscricoes.findMany();
}

function getById(id){
    return prisma.inscricoes.findUnique({where: {id}});
}

function create(data){
    return prisma.inscricoes.create({data});
}

function update(id, data){
    return prisma.inscricoes.update({where: {id}, data } );
}

function remove(id){
    return prisma.inscricoes.remove({where: {id}});
}

module.exports = {list, getById, create, update, remove}