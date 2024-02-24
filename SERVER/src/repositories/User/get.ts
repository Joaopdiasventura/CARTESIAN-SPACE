import {
	FullUser,
	GetUserParams,
	IGetUserRepository,
} from "../../controllers/User/protocols";
import { Message } from "../../controllers/protocols";
import prisma from "../../services/prisma";

export default class GetUserRepository implements IGetUserRepository {
	async get(params: GetUserParams): Promise<FullUser | Message> {
		const { email } = params;
		try {
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
				select: {
					name: true,
					picture: true,
					score: true,
				},
			});
			if (!user) {
				return {
					message: "Usuário não encontrado",
				};
			}
			const achievements = await prisma.achievements.findMany({
				where: {
					fk_user_email: email,
				},
			});
			return {
				user,
				achievements,
			};
		} catch (error) {
			return error;
		}
	}
}