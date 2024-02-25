import {
	AddAchievementParams,
	IAddAchievementRepository,
} from "../../controllers/Achievement/protocols.ts";
import prisma from "../../services/prisma";

export default class AddAchievementRepository
	implements IAddAchievementRepository
{
	async add(params: AddAchievementParams): Promise<void> {
		await prisma.achievement.create({
			data: { ...params },
		});
	}
}
