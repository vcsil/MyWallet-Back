/* eslint-disable no-underscore-dangle */
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import db from "../db/db.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  await db
    .collection("users")
    .insertOne({ name, email, password: passwordHash });

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    await db.collection("sessions").deleteOne({ userId: user._id });

    const token = uuid();

    await db
      .collection("sessions")
      .insertOne({ token, lastStatus: Date.now(), userId: user._id });

    return res.status(200).send({ token });
  }

  return res.status(401).send("Senha ou email incorretos!");
}
