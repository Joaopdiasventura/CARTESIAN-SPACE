import { AddAchievementParams, IAddAchievementRepository } from "../../controllers/Achievements/protocols.ts";
import { Message } from "../../controllers/protocols";
import prisma from "../../services/prisma";

export default class AddAchievementRepository implements IAddAchievementRepository{
    async add(params: AddAchievementParams): Promise<void | Message> {
        const achievement = await prisma.achievements.findFirst({
            where: {
                name: params.name,
                fk_user_email: params.fk_user_email
            }
        });

        if (achievement) {
            return {
                message: "Conquista já desbloqueada"
            }
        }

        await prisma.achievements.create({
            data:{...params}
        });
    }
}