const {Router} = require("express")
const pistaController = require("./pista.controller")
const validate = require("../../shared/validate");
const {createSchema, updateSchema} = require("./pista.schema");

const router = Router();

router.get('/pistas', pistaController.list);
router.get('/pistas/:id', pistaController.getById);
router.post('/pistas', validate(createSchema), pistaController.create);
router.put('/pistas/:id', validate(updateSchema), pistaController.update);
router.delete('/pistas/:id', pistaController.remove);

module.exports = router;