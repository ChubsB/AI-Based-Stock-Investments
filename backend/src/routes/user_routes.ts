import { Router } from "express"
import * as usersController from "../controllers/user_controller";

const userRouter = Router()

userRouter.post("/sign-up", usersController.addUserToCollection)
// userRouter.post("/login", usersController.addUserToCollection)
// userRouter.post("/logout", usersController.addUserToCollection)
// userRouter.get("/:userid", usersController.addUserToCollection)

export default userRouter 