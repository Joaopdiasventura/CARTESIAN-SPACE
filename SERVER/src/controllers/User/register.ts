import JWT from "../../services/jwt";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IRegisterUserRepository, RegisterUserParams } from "./protocols";

export default class RegisterUserController implements IController {
	constructor(private readonly repository: IRegisterUserRepository) {}
	async handle( request?: HttpRequest<RegisterUserParams> ): Promise<HttpResponse<string>> {
		const { body } = request;

		const result = await this.repository.register(body);
        if ("message" in result) {
            return {
                statusCode: 400,
                body: result
            }
        }
		const jwt = new JWT();
		return {
            statusCode: 201,
            body: await jwt.code(result)
        };
	}
}
