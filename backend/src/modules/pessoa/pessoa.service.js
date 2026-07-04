const pessoaRepository = require("./pessoa.repository");

async function list(){
    return pessoaRepository.list();
}

async function getById(id){
    const pessoa = pessoaRepository.findById(id);
    if(!pessoa){
        const error = new Error ("Pessoa não encontrada.");
        error.status = 404;
        throw Error;
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
    return pessoaRepository.remove()
}

module.exports = {list, getById, create, update, remove}