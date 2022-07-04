import { Router } from "express";

import movimentacaoValidationMiddleware from "../middlewares/movimentacaoValidationMiddleware.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import {
  getMovimentacao,
  postMovimentacao,
} from "../controllers/movimentacaoController.js";

const movimentacaoRouter = Router();
movimentacaoRouter.use(tokenValidationMiddleware);
movimentacaoRouter.post(
  "/movimentacao",
  movimentacaoValidationMiddleware,
  postMovimentacao
);
movimentacaoRouter.get("/movimentacao", getMovimentacao);

export default movimentacaoRouter;
