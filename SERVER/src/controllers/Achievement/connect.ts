import { HttpRequest, HttpResponse, IController, Message } from "../protocols";
import { ConnectAchievementParams, IConnectAchievementRepository } from "./protocols.ts";

export default class ConnectAchievementController implements IController {
    constructor(private readonly respository: IConnectAchievementRepository){}
    async handle(request?: HttpRequest<ConnectAchievementParams>): Promise<HttpResponse<Message>> {
        const {body} = request;

        try {
            const result = await this.respository.connect(body);

            if (result) {
                return {
                    statusCode: 400,
                    body: result
                }
            }

            return {
                statusCode: 201,
                body: {
                    message: "Conquista desbloqueada"
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}