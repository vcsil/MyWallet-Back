import { Router } from "express";
import authRouter from "./authRouter.js";
import movimentacaoRouter from "./movimentacaoRouter.js";

const router = Router();
router.use(authRouter);
router.use(movimentacaoRouter);
export default router;
