import userSignInSchema from "../schemas/userSignInSchema.js";

function userSignInSchemaValidationMiddleware(req, res, next) {
  const validation = userSignInSchema.validate(req.body);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }

  return next();
}

export default userSignInSchemaValidationMiddleware;
