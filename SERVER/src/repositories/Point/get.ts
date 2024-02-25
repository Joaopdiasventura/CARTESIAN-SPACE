import { IGetRankingRepository, Ranking } from "../../controllers/Point/protocols";
import prisma from "../../services/prisma";

export default class GetRankingRepository implements IGetRankingRepository{
    async get(): Promise<Ranking[]> {
        return await prisma.user.findMany({
            select: {
                name: true,
                picture: true,
                score: true
            },
            orderBy:{
                score: "desc"
            }
        });
    }
}