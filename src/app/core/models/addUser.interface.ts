import { IUser } from "./user.interface";

export interface IAddUser {
    user: IUser;
    id: number;
    name: string;
    username: string;
}