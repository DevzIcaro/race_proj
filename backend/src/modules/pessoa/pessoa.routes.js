const {Router} = require("express")
const pessoaController = require("./pessoa.controller")
const validate = require("../../shared/validate")
const { createSchema, updateSchema } = require("./pessoa.schema")

const router = Router();

router.get("/pessoas", pessoaController.list);
router.get("/pessoas/:id", pessoaController.getById);
router.post("/pessoas", validate(createSchema), pessoaController.create);
router.put("/pessoas/:id", validate(updateSchema), pessoaController.update);
router.delete("/pessoas/:id", pessoaController.remove);

module.exports = router;