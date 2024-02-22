import {
	IRegisterUserRepository,
	RegisterUserParams,
} from "../../controllers/User/protocols";
import { Message } from "../../controllers/protocols";
import User from "../../models/User";
import prisma from "../../services/prisma";

export default class RegisterUserRepository implements IRegisterUserRepository {
	async register(params: RegisterUserParams): Promise<User | Message> {
		const { email } = params;
		try {
			const user = await prisma.user.findUnique({
				where: { email },
			});

			if (user)
				return {
					message: "Já existe uma conta cadastrada nesse email",
				};

			return await prisma.user.create({
				data: { ...params },
			});
		} catch (error) {
			return error;
		}
	}
}