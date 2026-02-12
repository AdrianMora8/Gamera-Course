import { Router } from "express";
import { UserRepository } from "./users.respository";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";

export class UserRoutes{
    static get routes(): Router {
        const router = Router();
        
        const userRepository = new UserRepository();
        const userService = new UsersService(userRepository);
        const userController = new UserController(userService);

        router.get('/', userController.getAllUsers);

        return router;
    }
}