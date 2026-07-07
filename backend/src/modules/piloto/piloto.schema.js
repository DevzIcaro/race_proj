const { z } = require("zod");

const createSchema = z.object({
  nome: z.string()
    .min(3, "Nome do piloto é obrigatório")
    .max(50, "Nome muito extenso"),
  idade: z.number()
    .min(1, "Idade é obrigatório")
    .max(100, "Limite de Idade do piloto excedido"),
  equipeId: z.uuid()
});

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
