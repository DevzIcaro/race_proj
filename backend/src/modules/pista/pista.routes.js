const {Router} = require("express")
const pistaController = require("./pista.controller")

const router = Router();

router.get('/pistas', pistaController.list);
router.get('/pistas/:id', pistaController.getById);
router.post('/pistas', pistaController.create);
router.put('/pistas/:id', pistaController.update);
router.delete('/pistas/:id', pistaController.remove);

module.exports = router;