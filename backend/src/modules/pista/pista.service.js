const prismaRepository = require("./pista.repository");

async function list(){
   return prismaRepository.list();
}

async function getById(id){
    // [corrigido] faltava "await" -- sem ele, a variável seria a Promise em si
    // (sempre truthy), e o "if" de 404 nunca disparava. Também renomeei de
    // "piloto" pra "pista" -- era resto de copiar/colar de outro módulo.
    const pista = await prismaRepository.getById(id);
    if(!pista) {
        const error = new Error("A pista não foi encontrada");
        error.status = 404;
        throw error;
    }

    return(pista);
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