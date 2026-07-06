const {Router} = require("express")
const pessoaController = require("./pessoa.controller")


const router = Router();

router.get("/pessoas", pessoaController.list);
router.get("/pessoas/:id", pessoaController.getById);
router.post("/pessoas", pessoaController.create);
router.put("/pessoas/:id", pessoaController.update);
router.delete("/pessoas/:id", pessoaController.remove);

module.exports = router;