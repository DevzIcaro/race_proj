const { z } = require("zod");

const createSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome da equipe muito curto")
    .max(50, "Nome da equipe muito grande"),
});

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
