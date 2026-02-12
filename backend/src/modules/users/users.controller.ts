import { UsersService } from "./users.service";
import { Request, Response } from 'express';

export class UserController {

    constructor(
        private userService: UsersService
    ){}


    getAllUsers = async (_: Request, res: Response) => {
        const users = await this.userService.getAllUsers();
        res.status(200).json({
            ok: true,
            msg: 'Lista de usuarios',
            content: users
        });
        return;
    }
}
