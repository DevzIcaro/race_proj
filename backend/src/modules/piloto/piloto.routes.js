// Define os endpoints, e chama os comntrollers.  Ou seja aqui estão as rotas e suas lógicas de negócio.

const {Router} = require("express")
const pilotoController = require("./piloto.controller");

const router = Router();

router.get('/pilotos', pilotoController.list);
router.get('/piloto/:id', pilotoController.getById);
router.post('/pilotos', pilotoController.create);
router.put('/pilotos/:id', pilotoController.update);
router.delete('/pilotos/:id', pilotoController.remove);

module.exports = router