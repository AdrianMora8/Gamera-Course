import { UserRepository } from "./users.respository";

export class UsersService {

        constructor(private readonly userRepository: UserRepository) {
        }

        userGetInfo = async (uid: string) => {
            const users = await this.userRepository.getUserById(uid);
            if(!users) throw new Error("Usuario no encontrado");
            const data ={
                completeName: `${users.name} ${users.lastName}`,
                email: users.email,
                isOnline: users.isOnline
            }
            return data; 
        }

        userOnline = async (uid: string) =>{
            const userStatus = await this.userRepository.setUserStatus(uid, true);
            const userData = {
                uid: userStatus?._id,
                completeName: `${userStatus?.name} ${userStatus?.lastName}`,
                isOnline: userStatus?.isOnline
            }
            return userData;
        }
            

        userOffline = async (uid: string) =>{
            const userStatus = await this.userRepository.setUserStatus(uid, false);
            const userData = {
                uid: userStatus?._id,
                completeName: `${userStatus?.name} ${userStatus?.lastName}`,
                isOnline: userStatus?.isOnline
            }
            return userData;
        }

        getAllUsers = async () => {
            const users = await this.userRepository.getAllUsers();
            return users;
        }

}
