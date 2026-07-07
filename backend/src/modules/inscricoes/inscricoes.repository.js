const prisma = require("../../shared/prisma")

// [corrigido] era "prisma.inscricoes" (plural) em todas as funções -- o model
// no schema é "Inscricao" (singular), então o delegate do Prisma Client
// é "prisma.inscricao", sem o "s".
function list(){
    return prisma.inscricao.findMany();
}

function getById(id){
    return prisma.inscricao.findUnique({where: {id}});
}

function create(data){
    return prisma.inscricao.create({data});
}

function update(id, data){
    return prisma.inscricao.update({where: {id}, data } );
}

function remove(id){
    return prisma.inscricao.delete({where: {id}});
}

module.exports = {list, getById, create, update, remove}