import {
	AddAchievementParams,
	IAddAchievementRepository,
} from "../../controllers/Achievement/protocols.ts";
import { Message } from "../../controllers/protocols.js";
import prisma from "../../services/prisma";

export default class AddAchievementRepository
	implements IAddAchievementRepository
{
	async add(params: AddAchievementParams): Promise<void | Message> {
		if (await prisma.achievement.findFirst({where: {...params}})) {
			return {
				message: "Conquista já existente"
			}
		}
		await prisma.achievement.create({
			data: { ...params },
		});
	}
}
