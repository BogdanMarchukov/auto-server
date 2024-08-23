import Koa from "koa";
import { userRouter } from "./user/user.controller";
import { authController } from "./auth/auth.controller";

const app = new Koa();

const port = 3000;

app.use(userRouter.routes());
app.use(authController.routes());

app.listen(port, () => {
  console.log(`start server: http://localhost: $ {port} /`);
});
