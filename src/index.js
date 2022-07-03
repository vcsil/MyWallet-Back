import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);

app.listen(process.env.PORT, () => {
  console.log(chalk.magenta(`Server is listening on port ${process.env.PORT}`));
});
