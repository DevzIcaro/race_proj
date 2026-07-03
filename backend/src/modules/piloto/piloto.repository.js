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
    return prisma.piloto.upadte({where: {id}, data});
}

function remove(id){
    return prisma.piloto.remove({where: {id}});
}

module.export = {list, getById, create, update, remove};