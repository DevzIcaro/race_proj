const inscricoesRepository = require("./inscricoes.repository")

async function list(){
    return inscricoesRepository.list();
}

async function getById(id){
    // [corrigido] faltava "await" -- sem ele, "inscricao" seria a Promise em
    // si (sempre truthy), e o "if (!inscricao)" nunca dispararia.
    const inscricao = await inscricoesRepository.getById(id);
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
    // [corrigido] estava chamando "repository.create(id, data)" -- isso criaria
    // um registro novo em vez de atualizar o existente. O certo é "update".
    return inscricoesRepository.update(id, data);
}

async function remove(id){
    await getById(id);
    return inscricoesRepository.remove(id);
}

module.exports = {list, getById, create, update, remove}