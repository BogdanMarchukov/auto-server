import Koa from "koa";
import { userRouter } from "./user/user.controller";
import { authRouter } from "./auth/auth.controller";
import dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import { connectMongo } from "./common/database/mongo.connect";
import { exceptionFilter } from "./common/errors/exception.filter";
import { Db } from "mongodb";
import { autoRouter } from "./auto/auto.controller";

dotenv.config();

const app = new Koa();
let db: Db;

(async () => {
  db = await connectMongo();
})();

app.use(async (ctx, next) => {
  ctx.db = db;
  await next();
});

app.use(bodyParser());

const port = 3000;
app.use(exceptionFilter);

app.use(userRouter.routes());
app.use(authRouter.routes());
app.use(autoRouter.routes());

app.listen(port, () => {
  console.log(`start server: http://localhost: $ {port} /`);
});
