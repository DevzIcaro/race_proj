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
    // [corrigido] era "res.json(update)" -- "update" ali dentro é a própria
    // função (o nome dela mesma), não a variável "equipeUpdate" que guarda o
    // resultado de verdade. JSON.stringify não serializa função -> vira
    // undefined -> corpo de resposta vazio.
    res.json(equipeUpdate);
}

async function remove(req, res){
    const {id} = req.params;
    await equipeService.remove(id);
    // [corrigido] era status(203) (Non-Authoritative Information) -- o código
    // certo pra uma exclusão sem corpo de resposta é 204 (No Content).
    res.status(204).send();
}

module.exports = {list, getById, create, update, remove}