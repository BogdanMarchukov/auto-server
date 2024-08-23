import Koa from "koa";
import { userRouter } from "./user/user.controller";
import { authRouter } from "./auth/auth.controller";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();

const port = 3000;

app.use(userRouter.routes());
app.use(authRouter.routes());

app.listen(port, () => {
  console.log(`start server: http://localhost: $ {port} /`);
});
