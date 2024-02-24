import { AddPointParams, IAddPointRepository } from "../../controllers/Point/protocols";
import { Message } from "../../controllers/protocols";
import prisma from "../../services/prisma";

export default class AddPointRepository implements IAddPointRepository{
    async add(params: AddPointParams): Promise<number | Message> {
        try {
            const user = await prisma.user.findUnique({
                where:{ email: params.fk_user_email}
            });

            if (!user) {
                return {
                    message: "Usuário não encontrado"
                }
            }

            const existScore = await prisma.point.findFirst({
                where: {
                    exercise: params.exercise,
                    fk_user_email: user.email
                }
            });

            if (existScore) {
                if (params.score > existScore.score) {
                    const diference = params.score - existScore.score
                    await prisma.point.update({
                        where:{
                            id: existScore.id
                        },
                        data:{
                            score: diference
                        }
                    });

                    await prisma.user.update({
                        where: {
                            email: user.email
                        },
                        data:{
                            score: user.score + diference
                        }
                    });

                    return user.score + diference;
                }
                else {
                    return 0;
                }
            }

            await prisma.point.create({
                data:{...params}
            });

            await prisma.user.update({
                where: {
                    email: user.email
                },
                data:{
                    score: user.score + params.score
                }
            });

            return user.score + params.score;
        } catch (error) {
            return error;
        }
    }
}