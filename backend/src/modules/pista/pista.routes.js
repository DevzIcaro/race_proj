const {Router} = require("express")
const pistaController = require("./pista.controller")

const router = Router

router.get('/pista', pistaController.list);
router.get('/pista/:id', pistaController.getById);
router.post('/pista', pistaController.create);
router.put('/pista/:id', pistaController.update);
router.delete('/pista/:id', pistaController.remove);

module.exports = router