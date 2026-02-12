import { Server, Socket } from "socket.io";
import { UserRepository } from "./users.respository";
import { UsersService } from "./users.service";
import { UserEvents } from "./users.event";

export class UserGateway {

    constructor(private io: Server, private socket: Socket, private uid: string) {
        const userRepository = new UserRepository();
        const usersService = new UsersService(userRepository);
        const userEvents = new UserEvents(usersService, this.io, this.socket, this.uid);
        userEvents.registerAll();
    }

}