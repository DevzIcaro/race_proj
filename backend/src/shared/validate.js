// Middleware genérico de validação. Recebe um schema Zod e devolve uma função
// no formato que o Express espera: (req, res, next).
//
// Uso: router.post("/pessoas", validate(pessoaSchema.create), pessoaController.create)
//
// Se os dados forem inválidos, responde 400 direto aqui e a requisição nunca
// chega no controller. Se forem válidos, substitui req.body pelos dados já
// validados (e "limpos" -- Zod remove campos que não estão no schema) e
// chama next() pra seguir o fluxo normal.
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        detalhes: result.error.issues.map((issue) => ({
          campo: issue.path.join("."),
          mensagem: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
}

module.exports = validate;
