const inscricoesService = require("./inscricoes.service")

async function list(req, res){
    const inscricoesList = await inscricoesService.list();
    res.json(inscricoesList);
}

async function getById(req, res){
    const {id} = req.params;
    const inscricao = await inscricoesService.getById(id);
    res.json(inscricao);
}

async function create(req, res){
    const inscricoesCreate = await inscricoesService.create(req.body);
    res.status(201).json(inscricoesCreate);
}

async function update(req, res){
    const {id} = req.params;
    const inscricaoUpdate = await inscricoesService.update(id, req.body);
    res.json(inscricaoUpdate);
}

async function remove(req, res){
    const {id} = req.params;
    await inscricoesService.remove(id);
    res.status(204).send();
}

module.exports = {list, getById, create, update, remove};