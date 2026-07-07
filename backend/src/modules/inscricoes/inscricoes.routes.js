const {Router} = require("express")
const inscricoesController = require("./inscricoes.controller")
const validate = require("../../shared/validate");
const {createSchema, updateSchema} = require("./inscricoes.schema");

const router = Router();

router.get("/inscricoes", inscricoesController.list);
router.get("/inscricoes/:id", inscricoesController.getById);
router.post("/inscricoes", validate(createSchema),inscricoesController.create);
router.put("/inscricoes/:id", validate(updateSchema), inscricoesController.update);
router.delete("/inscricoes/:id", inscricoesController.remove);

module.exports = router;