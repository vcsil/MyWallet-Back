import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(chalk.magenta(`Server is listening on port ${process.env.PORT}`));
});
