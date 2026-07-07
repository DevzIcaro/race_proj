// Define os endpoints, e chama os comntrollers.  Ou seja aqui estão as rotas e suas lógicas de negócio.

const {Router} = require("express")
const pilotoController = require("./piloto.controller");
const validate = require("../../shared/validate");
const {createSchema, updateSchema} = require("./piloto.schema");

const router = Router();

router.get('/pilotos', pilotoController.list);
// [corrigido] era "/piloto/:id" (singular) -- inconsistente com as outras
// rotas desse arquivo (list, put, delete), que usam "/pilotos" (plural).
router.get('/pilotos/:id', pilotoController.getById);
router.post('/pilotos', validate(createSchema), pilotoController.create);
router.put('/pilotos/:id', validate(updateSchema), pilotoController.update);
router.delete('/pilotos/:id', pilotoController.remove);

module.exports = router;