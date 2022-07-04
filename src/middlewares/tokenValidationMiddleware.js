import db from "../db/db.js";

async function tokenValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Não passou o token.");
  }

  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    return res.status(401).send("Token não existe");
  }

  const user = await db.collection("users").findOne({ _id: session.userId });
  if (!user) {
    return res.status(401).send("Usuário não existe.");
  }

  delete user.password;

  res.locals.user = user;
  return next();
}

export default tokenValidationMiddleware;
