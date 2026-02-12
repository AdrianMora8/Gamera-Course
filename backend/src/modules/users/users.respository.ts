import { UserModel } from "../../model/user.model"

export class UserRepository{
    constructor
    (){}

    getUserById = async (uid: string) => {
        const user = await UserModel.findById(uid);
        return user;
    }

    setUserStatus = async (uid: string , status: boolean) => {
        const statusUpdate   = await UserModel.findByIdAndUpdate(uid, {isOnline: status}, {new: true});
        return statusUpdate;
    }

    getAllUsers = async () => {
        const users = await UserModel.find();
        return users;
    }
}