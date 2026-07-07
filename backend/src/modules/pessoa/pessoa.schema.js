const { z } = require("zod");

// Schema pra criação: todos os campos obrigatórios, com regras específicas.
const createSchema = z.object({
  email: z.string().email("email inválido"),
  senha: z.string().min(6, "senha deve ter pelo menos 6 caracteres"),
  nome: z.string().min(1, "nome é obrigatório"),
});

// Schema pra atualização: os mesmos campos, mas todos opcionais -- um PUT
// pode mandar só o que quer mudar (ex: só o nome), não precisa repetir tudo.
// .partial() pega o schema acima e torna cada campo dele opcional.
const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema };
