import movimentacaoSchema from "../schemas/movimentacaoSchema.js";

function movimentacaoValidationMiddleware(req, res, next) {
  const validation = movimentacaoSchema.validate(req.body);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }

  return next();
}

export default movimentacaoValidationMiddleware;
