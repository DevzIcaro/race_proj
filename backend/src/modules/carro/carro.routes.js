const {Router} = require("express");

const carroController = require("./carro.controller");

const router = Router();

router.get("/carros", carroController.list);
router.get("/carros/:id", carroController.getById);
router.post("/carros", carroController.create);
router.put("/carros/:id", carroController.update);
router.delete("/carros/:id", carroController.remove);

module.exports = router;