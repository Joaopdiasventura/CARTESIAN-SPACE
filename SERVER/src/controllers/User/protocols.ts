import Achievement  from "../../models/Achievement";
import User from "../../models/User";
import { Message } from "../protocols";

export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface GetUserParams {
  email: string;
}

export interface PictureParams {
  email: string;
  fileObject: any;
  url_image?: string;
}

export interface IRegisterUserRepository{
    register(params: RegisterUserParams):Promise<User | Message>
}

export interface ILoginUserRepository{
    login(params: LoginUserParams):Promise<User | Message>
}

export interface IGetUserRepository{
    get(params: GetUserParams):Promise<FullUser | Message>
}

export interface IPictureRepository {
  change(params: PictureParams): Promise<void | Message>;
}

export interface FullUser {
  user: {
    name: string;
    picture: string;
    score: number;
  }
  achievements: Achievement[]
}