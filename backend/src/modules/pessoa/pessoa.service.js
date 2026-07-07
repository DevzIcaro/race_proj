const pessoaRepository = require("./pessoa.repository");

async function list(){
    return pessoaRepository.list();
}

async function getById(id){
    const pessoa = await pessoaRepository.getById(id);
    if(!pessoa){
        const error = new Error ("Pessoa não encontrada.");
        error.status = 404;
        throw error;
    };

    return pessoa;
}

async function create(data){
    return pessoaRepository.create(data);
}

async function update(id, data){
    await getById(id);
    return pessoaRepository.update(id, data);
}

async function remove(id){
    await getById(id);
    return pessoaRepository.remove(id)
}

module.exports = {list, getById, create, update, remove}