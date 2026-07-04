const {Router} = require("express")
const corridaController = require("./corrida.controller")

const router = Router();

router.get("/corridas", corridaController.list);
router.get("/corridas/:id", corridaController.getById);
router.post("/corridas", corridaController.create);
router.put("/corridas/:id", corridaController.update);
router.delete("/corridas/:id", corridaController.remove);

module.exports = router;