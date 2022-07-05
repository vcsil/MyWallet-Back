/* eslint-disable no-underscore-dangle */
import db from "../db/db.js";

export async function postMovimentacao(req, res) {
  const newMovimentacao = req.body;
  const id = res.locals.user._id;

  const { valor } = newMovimentacao;
  const partesValor = String(valor).split(".");

  if (partesValor.length === 2) {
    if (partesValor[1].length === 1) {
      partesValor[1] = `${partesValor[1]}0`;
    } else if (partesValor[1].length > 2) {
      partesValor[1] = partesValor[1].slice(0, 2);
    }
    newMovimentacao.valor = `${parseInt(partesValor[0], 10)}.${parseInt(
      partesValor[1],
      10
    )}`;
  } else {
    newMovimentacao.valor = `${partesValor[0]}.00`;
  }

  const atualizaSaldo =
    newMovimentacao.movimentacao === "entrada"
      ? Number(newMovimentacao.valor)
      : Number(newMovimentacao.valor) * -1;

  try {
    const usuarioComMovimentacao = await db
      .collection("movimentacao")
      .findOne({ userId: id });

    if (usuarioComMovimentacao) {
      await db.collection("movimentacao").updateOne(
        { userId: id },
        {
          $push: { movimentacao: newMovimentacao },
          $inc: { saldo: atualizaSaldo },
        }
      );
      return res.status(200).send("Movimentação adicionada.");
    }

    await db.collection("movimentacao").insertOne({
      userId: id,
      saldo: atualizaSaldo,
      movimentacao: [newMovimentacao],
    });

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
      return res.status(200).send(todasMovimentcao);
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
