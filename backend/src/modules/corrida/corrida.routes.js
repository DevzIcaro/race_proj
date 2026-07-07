const {Router} = require("express");
const corridaController = require("./corrida.controller");
const validate = require("../../shared/validate");
const {createSchema, updateSchema} = require("./corrida.schema");

const router = Router();

router.get("/corridas", corridaController.list);
router.get("/corridas/:id", corridaController.getById);
router.post("/corridas", validate(createSchema), corridaController.create);
router.put("/corridas/:id", validate(updateSchema), corridaController.update);
router.delete("/corridas/:id", corridaController.remove);

module.exports = router;