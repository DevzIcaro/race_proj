const { Router } = require("express");
const {AuthSchema} = require("../auth/auth.schema");
const authController = require("./auth.controller");
const validate = require("../../shared/validate");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    statusCode: 429,
    message: "Você excedeu o número de tentativas",
})


const router = Router();

router.post("/login", limiter, validate(AuthSchema), authController.login);

module.exports = router;
