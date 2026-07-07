const { z } = require("zod");

const createSchema = z.object({
  num_inscricao: z.number().min(1, "Numero de inscrição é obrigatório"),
  desc_inscricao: z
    .string()
    .min(5, "Descrição muito curta")
    .max(200, "Descrição muito longa")
    .optional(),
  pilotoId: z.uuid(),
  carroId: z.uuid(),
  corridaId: z.uuid(),
});

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
