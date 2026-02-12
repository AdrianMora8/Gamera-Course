import { UserModel } from "../../model/user.model";
import { UserData } from "./auth.interface";

export class AuthRepository {
    findUserByEmail = async (email: string) => {
        const user = await UserModel.findOne({ email });

        return user;
    }

    createUser = async (userData: UserData) => {
       const newUser = await UserModel.create(userData);
       return newUser;
    }

    findUserById = async (id: string) => {
        const user = await UserModel.findById(id);
        return user;
    }

}