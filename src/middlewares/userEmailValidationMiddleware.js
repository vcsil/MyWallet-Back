import db from "../db/db.js";

async function userEmailValidationMiddleware(req, res, next) {
  const { email } = req.body;

  const emailExiste = await db.collection("user").findOne({ email });

  if (emailExiste) {
    return res.status(409).send("email já utilizado");
  }

  return next();
}

export default userEmailValidationMiddleware;
