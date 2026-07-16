const { z } = require("zod");

const createSchema = z.object({
  email: z.string().email("email inválido"),
  senha: z.string().min(6, "senha deve ter pelo menos 6 caracteres"),
  nome: z.string().min(3, "nome é obrigatório"),
});

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
