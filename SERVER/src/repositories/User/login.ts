import { ILoginUserRepository, LoginUserParams } from "../../controllers/User/protocols";
import { Message } from "../../controllers/protocols";
import User from "../../models/User";
import prisma from "../../services/prisma";

export default class LoginUserRepository implements ILoginUserRepository{
    async login(params: LoginUserParams): Promise<User | Message> {
        const {email}  = params;
        try {
            const user = await prisma.user.findUnique({
                where: {email}
            });

            if (!user) {
                return{
                    message: "Conta não encontrada"
                }
            }

            return user;
        } catch (error) {
            
        }
    }
}