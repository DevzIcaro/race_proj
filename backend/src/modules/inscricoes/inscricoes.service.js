const inscricoesRepository = require("./inscricoes.repository")

async function list(){
    return inscricoesRepository.list();
}

async function getById(id){
    const inscricao = inscricoesRepository.findById(id);
    if(!inscricao){
        const error = new Error("Inscrição não foi encontrada");
        error.status = 404;
        throw error;
    }

    return inscricao;
}

async function create(data){
    return inscricoesRepository.create(data);
}

async function update(id, data){
  await getById(id);
    return inscricoesRepository.create(id, data);
}

async function remove(id){
    await getById(id);
    return inscricoesRepository.remove(id);
}

module.exports = {list, getById, create, update, remove}