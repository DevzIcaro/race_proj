const prismaRepository = require("./pista.repository");

async function list(){
   return prismaRepository.list();
}

async function getById(id){
    const piloto = prismaRepository.findById(id);
    if(!piloto) {
        const error = new Error("A pista não foi encontrada");
        error.status = 404;
        throw error;
    }

    return(piloto);
}

async function create(data){
    return prismaRepository.create(data);
}

async function update(id, data){
    await getById(id);
    return prismaRepository.update(id, data);
}

async function remove(id){
    await getById(id);
    return prismaRepository.remove(id);
}

module.exports = {list, getById, create, update, remove}