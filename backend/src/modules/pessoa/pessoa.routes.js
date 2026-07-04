const {Router} = require("express")
const pessoaController = require("./pessoa.controller")


const router = Router();

res.get("/pessoas", pessoaController.list);
res.get("/pessoa/:id", pessoaController.getById);
res.post("/pessoas", pessoaController.create);
res.put("/pessoas/:id", pessoaController.update);
res.delete("/pessoas:id", pessoaController.remove);

module.exports = router