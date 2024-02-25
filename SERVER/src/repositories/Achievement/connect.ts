import { ConnectAchievementParams, IConnectAchievementRepository } from "../../controllers/Achievement/protocols.ts";
import { Message } from "../../controllers/protocols";
import prisma from "../../services/prisma";

export default class ConnectAchievementRepository implements IConnectAchievementRepository{
    async connect(params: ConnectAchievementParams): Promise<Message> {
        const user  = await prisma.user.findUnique({
            where: {
                email: params.fk_user_email
            }
        });

        if (!user) {
            return {
                message: "Usuário não encontrado"
            }
        }

        const achievement = await prisma.achievement.findUnique({
            where:{
                id: params.fk_achievement_id
            }
        });

        if (!achievement) {
            return {
                message: "Conquista não encontrada"
            }
        }

        if (prisma.user_achievement.findFirst({where: {...params}})) {
            return {
                message: "Conquista já está desbloqueada"
            }
        }

        await prisma.user_achievement.create({
            data: {...params}
        });
    }
}