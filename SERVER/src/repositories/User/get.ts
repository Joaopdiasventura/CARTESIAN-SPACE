import {
	FullUser,
	GetUserParams,
	IGetUserRepository,
} from "../../controllers/User/protocols";
import { Message } from "../../controllers/protocols";
import Achievement from "../../models/Achievement";
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

			const connections = await prisma.user_achievement.findMany({
				where: {
					fk_user_email: email,
				},
				orderBy: {
					id: "desc"
				}
			});

			const achievements:Achievement[] = [];
			for (let i = 0; i < connections.length; i++) {
				const achievement = await prisma.achievement.findUnique({
					where: { 
						id: connections[i].fk_achievement_id 
					}
				});
				achievements.push(achievement);
			}

			return {
				user,
				achievements,
			};
		} catch (error) {
			return error;
		}
	}
}
