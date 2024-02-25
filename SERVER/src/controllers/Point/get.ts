import { HttpResponse, IController } from "../protocols";
import { IGetRankingRepository, Ranking } from "./protocols";

export default class GetRankingController implements IController{
    constructor (private readonly repository: IGetRankingRepository){}
    async handle(): Promise<HttpResponse<Ranking[]>> {
        try {
            return {
                statusCode: 200,
                body: await this.repository.get()
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}