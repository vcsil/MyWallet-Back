import userSignUpSchema from "../schemas/userSignUpSchema.js";

function userSignUpSchemaValidationMiddleware(req, res, next) {
  const validation = userSignUpSchema.validate(req.body);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(422).send("Senhas diferentes.");
  }

  return next();
}

export default userSignUpSchemaValidationMiddleware;
