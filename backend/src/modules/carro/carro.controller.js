const carroService = require("./carro.service")

async function list(req, res){
    const carroList = await carroService.list();
    res.json(carroList);
}

async function getById(req, res){
    const {id} = req.params;
    const carro = await carroService.getById(id)
    res.json(carro);
}

async function create(req, res){
    const carrosCreate = await carroService.create(req.body);
    res.status(201).json(carrosCreate);
}

async function update(req, res){
    const {id} = req.params;
    const carrosUpdate = await carroService.update(id, req.body);
    res.json(carrosUpdate);
}

async function remove(req, res){
    const {id} = req.params;
    await carroService.remove(id);
    res.status(204).send();
}

module.exports = {list, getById, create, update, remove};