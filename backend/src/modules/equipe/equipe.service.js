const equipeRepository = require("./equipe.repository")

async function list(){
    return equipeRepository.list();
}

async function getById(id){
    const equipe =  equipeRepository.findById(id);
    if(!equipe){
        const error = new Error("A equipe não foi encontrada");
        error.status = 404;
        throw error
    }

    return (equipe);
}

async function create(data){
    return equipeRepository.create(data);
}

async function update(id, data){
    await getById(id);
    return equipeRepository.update(id, data);
}

async function remove(id){
    await getById(id);
    return equipeRepository.remove(id);
}

module.exports = {list, getById, create, update, remove}