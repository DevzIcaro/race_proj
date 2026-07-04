const {Router} = require("express")
const inscricoesController = require("./inscricoes.controller")

const router = Router

router.get("/inscricoes", inscricoesController.list);
router.get("/inscricoes/:id", inscricoesController.getById);
router.post("/inscricoes", inscricoesController.create);
router.put("/inscricoes/:id", inscricoesController.update);
router.delete("/inscricoes/:id", inscricoesController.remove);

module.exports = router