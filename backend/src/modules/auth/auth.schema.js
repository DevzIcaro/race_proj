const {z} = require("zod")

const AuthSchema = z.object({
    email: z.string().email("Senha ou email invalido"),
    senha: z.string().min(6, "Senha ou email invalido")
});

module.exports = {AuthSchema};