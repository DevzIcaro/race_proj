const { z } = require("zod");

const createSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome da pista é Obrigatório")
    .max(100, "O nome da pista excede os caracteres"),
  corridaId: z.uuid(),
});

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
