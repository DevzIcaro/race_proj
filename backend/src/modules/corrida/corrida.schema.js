const { z } = require("zod");

const createSchema = z.object({
  nome_grand_prix: z
    .string()
    .min(5, "Nome do Grand Prix é curto")
    .max(80, "Nome do Grand Prix é muito grande"),
});

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
