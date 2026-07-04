const {Router} = require("express");

const carroController = require("./carro.controller");

const router = Router;

router.get("/carro", carroController.list);
router.get("/carro/:id", carroController.getById);
router.post("/carro", carroController.create);
router.put("/carro/:id", carroController.update);
router.delete("/carro/:id", carroController.remove);

module.exports = router;