const {Router} = require("express")

const equipeController = require("./equipe.controller")

const router = Router;

router.get("/equipes", equipeController.list());
router.get("/equipe/:id", equipeController.getById());
router.post("/equipes", equipeController.create());
router.put("/equipes/:id", equipeController.update());
router.delete("/equipes/:id", equipeController.remove());

module.exports = router