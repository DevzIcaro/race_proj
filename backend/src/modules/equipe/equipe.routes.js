const { Router } = require("express");

const equipeController = require("./equipe.controller");
const validate = require("../../shared/validate");
const { createSchema, updateSchema } = require("./equipe.schema");

const router = Router();

router.get("/equipes", equipeController.list);
// [corrigido] era "/equipe/:id" (singular) -- inconsistente com as outras
// rotas desse mesmo arquivo, que usam "/equipes" (plural).
router.get("/equipes/:id", equipeController.getById);
router.post("/equipes", validate(createSchema), equipeController.create);
router.put("/equipes/:id", validate(updateSchema), equipeController.update);
router.delete("/equipes/:id", equipeController.remove);

module.exports = router;
