const corridaService = require("./corrida.repository")

async function list(){
    return corridaService.list();
}

async function getById(id){
    const corrida = await corridaService.getById(id);
    if(!corrida){
        const error = new Error("Corrida não encontrada");
        error.status = 404;
        throw error;
    }

    return (corrida);
}

async function create(data){
    return corridaService.create(data);
}

async function update(id, data){
    await getById(id);
    return corridaService.update(id, data);
}

async function remove(id){
    await getById(id);
    return corridaService.remove(id);
}

module.exports = {list, getById, create, update, remove}