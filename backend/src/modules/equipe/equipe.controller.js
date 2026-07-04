const equipeService = require("./equipe.service");

async function list(req, res){
    const equipes = await equipeService.list();
    res.json(equipes);
}

async function getById(req, res){
    const {id} = req.params
    const equipe = await equipeService.getById(id);
    res.json(equipe);
}

async function create(req, res){
    const equipeCreate = await equipeService.create(req.body);
    res.status(201).json(equipeCreate);
}

async function update(req, res){
    const {id} = req.params;
    const equipeUpdate = await equipeService.update(id, req.body);
    res.json(update);
}

async function remove(req, res){
    const {id} = req.params;
    await equipeService.remove(id);
    res.status(203).send();
}

module.exports = {list, getById, create, update, remove}