const inscricoesRepository = require("./inscricoes.repository")

function list(){
    return inscricoesRepository.list();
}

function getById(id){
    const inscricao = inscricoesRepository.findById(id);
    if(!inscricao){
        const error = new Error("Inscrição não foi encontrada");
        error.status = 404;
        throw error;
    }

    return inscricao;
}

function create(data){
    return inscricoesRepository.create(data);
}

function update(id, data){
  await getById(id);
    return inscricoesRepository.create(id, data);
}

function remove(id){
    await getById(id);
    return inscricoesRepository.remove(id);
}

module.exports = {list, getById, create, update, remove}