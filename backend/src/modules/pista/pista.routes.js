const {Router} = require("express")
const pistaController = require("./pista.controller")

const router = Router

router.get('/pista', pistaController.list);
router.get('/pista/:id', pistaController.getById);
router.post('/pista', pistaController.create);
router.put('/piloto/:id', pistaController.update);
router.delete('/piloto/:id', pistaController.remove);

module.exports = router