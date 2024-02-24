import { HttpRequest, HttpResponse, IController } from "../protocols";
import { AddPointParams, IAddPointRepository } from "./protocols";

export default class AddPointController implements IController {
    constructor(private readonly repository: IAddPointRepository){}
    async handle(request?: HttpRequest<AddPointParams>): Promise<HttpResponse<string>> {
        const {body} = request;
        try {
            const result = await this.repository.add(body);

            if (typeof result != "number") {
                return{
                    statusCode: 400,
                    body: result
                }
            }

            return {
                statusCode: 200,
                body: `${result}`
            }

            return
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}