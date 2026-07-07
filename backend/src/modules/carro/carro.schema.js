const { z } = require("zod");

const createSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome do carro é curto")
    .max(50, "O nome do carro é muito grande"),
  modelo: z
    .string()
    .min(5, "O modelo do carro é curto")
    .max(50, "O modelo do carro é muito grande"),
  equipeId: z.uuid(),
});

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
