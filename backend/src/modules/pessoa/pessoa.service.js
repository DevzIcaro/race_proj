const pessoaRepository = require("./pessoa.repository");

function list(){
    return pessoaRepository.list();
}

function getById(id){
    const pessoa = pessoaRepository.findById(id);
    if(!pessoa){
        const error = new Error ("Pessoa não encontrada.");
        error.status = 404;
        throw Error;
    };

    return pessoa;
}

function create(data){
    return pessoaRepository.create(data);
}

function update(id, data){
    await getById(id);
    return pessoaRepository.update(id, data);
}

function remove(id){
    await getById(id);
    return pessoaRepository.remove()
}

module.exports = {list, getById, create, update, remove}