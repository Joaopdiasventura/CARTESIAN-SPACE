import { HttpRequest, HttpResponse, IController } from "../protocols";
import { GetUserParams, IGetUserRepository } from "./protocols";

export default class GetUserController implements IController{
    constructor(private readonly repository: IGetUserRepository){}
    async handle(request?: HttpRequest<GetUserParams>): Promise<HttpResponse<unknown>> {
        const {params} = request;

        try {
            const result = await this.repository.get(params);

            if ("message" in result) {
                return {
                    statusCode: 400,
                    body: result
                }
            }

            return {
                statusCode: 200,
                body: result
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}