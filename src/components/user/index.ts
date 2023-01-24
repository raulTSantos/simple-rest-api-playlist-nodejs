
import { Router } from "express";
import * as Controller from "./controller";

const user_router = Router();
user_router.route("/").post(Controller.createUser);
user_router.route("/login").post(Controller.loginUser);

export default user_router;
