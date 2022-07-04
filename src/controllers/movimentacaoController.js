/* eslint-disable no-underscore-dangle */
import db from "../db/db.js";

export async function postMovimentacao(req, res) {
  const newMovimentacao = req.body;
  const id = res.locals.user._id;

  try {
    const usuarioComMovimentacao = await db
      .collection("movimentacao")
      .findOne({ userId: id });
    console.log(usuarioComMovimentacao);
    if (usuarioComMovimentacao) {
      await db
        .collection("movimentacao")
        .updateOne(
          { userId: id },
          { $push: { movimentacao: newMovimentacao } }
        );
      return res.status(200).send("Movimentação adicionada.");
    }

    await db
      .collection("movimentacao")
      .insertOne({ userId: id, movimentacao: [newMovimentacao] });

    return res.status(200).send("Movimentações iniciadas.");
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function getMovimentacao(req, res) {
  const id = res.locals.user._id;

  try {
    const todasMovimentcao = await db
      .collection("movimentacao")
      .findOne({ userId: id });

    if (todasMovimentcao) {
      return res.status(200).send(todasMovimentcao.movimentacao);
    }

    return res.status(200).send([]);
  } catch (err) {
    return res.status(500).send(err);
  }
}

// export async function deleteUser(req, res) {
//   const { user } = req.locals;

//   await db.collection("users").deleteOne({ _id: user._id });

//   res.sendStatus(200);
// }
