import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import userEmailValidationMiddleware from "../middlewares/userEmailValidationMiddleware.js";
import userSignInSchemaValidationMiddleware from "../middlewares/userSignInSchemaValidationMiddleware.js";
import userSignUpSchemaValidationMiddleware from "../middlewares/userSignUpSchemaValidationMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  userSignUpSchemaValidationMiddleware,
  userEmailValidationMiddleware,
  signUp
);
authRouter.get("/sign-up", (req, res) => {
  res.send("Vai vendo");
});
authRouter.post("/sign-in", userSignInSchemaValidationMiddleware, signIn);

export default authRouter;
