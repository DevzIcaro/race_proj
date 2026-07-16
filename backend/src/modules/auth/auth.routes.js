const { Router } = require("express");
const {AuthSchema} = require("../auth/auth.schema");
const authController = require("./auth.controller");
const validate = require("../../shared/validate");

const router = Router();

router.post("/login", validate(AuthSchema), authController.login);

module.exports = router;
