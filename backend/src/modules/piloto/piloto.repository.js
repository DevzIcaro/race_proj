//  Aqui fica a chamada das tabelas do banco que você estará utilizando.
//  A única cama que importa pro prisma client por que ele envia a requisição para o banco de dados seja ela qual for deletar, editar, adicionar etc.
//  Em suma menciona os campos do banco de dados


const prisma = require("../../shared/prisma");

function list(){
    return prisma.piloto.findMany();
}

function getById(id){
    return prisma.piloto.findUnique({where:{id}})
}

function create(data){
    return prisma.piloto.create({data});
}

function update(id, data){
    return prisma.piloto.update({where: {id}, data});
}

function remove(id){
    return prisma.piloto.delete({where: {id}});
}

// [corrigido] era "module.export" (sem o "s") -- isso não sobrescreve o
// export padrão do Node, então o service recebia um objeto vazio {} e
// qualquer método (create, update, etc.) virava undefined.
module.exports = {list, getById, create, update, remove};