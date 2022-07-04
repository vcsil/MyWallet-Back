import joi from "joi";

const movimentacaoSchema = joi.object({
  date: joi
    .string()
    .pattern(/^[0-9]{2}\/[0-9]{2}$/)
    .required(),
  descricao: joi.string().required(),
  valor: joi.number().required(),
  movimentacao: joi.string().valid("entrada", "saida").required(),
});

export default movimentacaoSchema;
