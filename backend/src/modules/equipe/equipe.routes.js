const {Router} = require("express")

const equipeController = require("./equipe.controller")

const router = Router();

router.get("/equipes", equipeController.list);
// [corrigido] era "/equipe/:id" (singular) -- inconsistente com as outras
// rotas desse mesmo arquivo, que usam "/equipes" (plural).
router.get("/equipes/:id", equipeController.getById);
router.post("/equipes", equipeController.create);
router.put("/equipes/:id", equipeController.update);
router.delete("/equipes/:id", equipeController.remove);

module.exports = router;