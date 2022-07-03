import userSignUpSchema from "../schemas/userSignUpSchema.js";
import db from "../db/db.js";

async function userSignUpSchemaValidationMiddleware(req, res, next) {
  const validation = userSignUpSchema.validate(req.body);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(422).send("Senhas diferentes.");
  }
  const emailExiste = await db
    .collection("users")
    .findOne({ email: req.body.email });

  if (emailExiste) {
    return res.status(409).send("E-mail já utilizado");
  }

  return next();
}

export default userSignUpSchemaValidationMiddleware;
