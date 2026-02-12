import { Server, Socket } from "socket.io";
import { UsersService } from "./users.service";

export class UserEvents{
    constructor(private usersService: UsersService, private io: Server, private socket: Socket, private uid: string){}

    async registerAll(){
        await this.handleUserConnected();                                           
        this.socket.on("disconnect", this.handleUserDisconnected)
    }

    private handleUserConnected = async () => {
        const userInfo = await this.usersService.userGetInfo(this.uid);
        console.log("Usuario conectado:",`${userInfo.completeName}`)

        await this.usersService.userOnline(this.uid);
        const allUsers = await this.usersService.getAllUsers();
        this.io.emit("user-status", allUsers)
    }

    private handleUserDisconnected = async () => {
        const userInfo = await this.usersService.userGetInfo(this.uid);
        console.log("Usuario desconectado:",`${userInfo.completeName}`)
        
        await this.usersService.userOffline(this.uid);
        const allUsers = await this.usersService.getAllUsers();
        this.io.emit("user-status", allUsers)
    }
}
