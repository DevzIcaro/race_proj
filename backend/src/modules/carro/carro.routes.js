const {Router} = require("express");

const carroController = require("./carro.controller");

// [corrigido] era "const router = Router" (sem chamar a função) -- isso
// atribuía a própria função-fábrica a "router", que não tem método .get/.post.
// Precisa dos parênteses pra executar Router() e pegar a instância de verdade.
const router = Router();

router.get("/carros", carroController.list);
router.get("/carros/:id", carroController.getById);
router.post("/carros", carroController.create);
router.put("/carros/:id", carroController.update);
router.delete("/carros/:id", carroController.remove);

module.exports = router;