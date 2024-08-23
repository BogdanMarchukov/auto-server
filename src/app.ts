import Koa from "koa";
import { userRouter } from "./user/user.controller";
import { authRouter } from "./auth/auth.controller";
import dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import { connectMongo } from "./common/database/mongo.connect";

dotenv.config();

const app = new Koa();

app.use(async (cxt, next) => {
  const db = await connectMongo();
  cxt.db = db;
  await next();
});

app.use(bodyParser());

const port = 3000;

app.use(userRouter.routes());
app.use(authRouter.routes());

app.listen(port, () => {
  console.log(`start server: http://localhost: $ {port} /`);
});
