import express from "express";
import {
  DeleteUser,
  GetUser,
  Login,
  Logout,
  Signup,
} from "../controller/user.controller.js";
import { VerifyAdmin, VerifyJWT } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/sigup").post(Signup);
userRouter.route("/login").post(Login);
userRouter.route("/logout").post(VerifyJWT, Logout);
userRouter.route("/get-user").get(VerifyJWT, VerifyAdmin, GetUser);
userRouter.route("/delete-user/:id").delete(VerifyJWT, VerifyAdmin, DeleteUser);

export default userRouter;
