import JWT from "../../services/jwt";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { ILoginUserRepository, LoginUserParams } from "./protocols";

export default class LoginUserController implements IController {
	constructor(private readonly repository: ILoginUserRepository) {}
	async handle(
		request?: HttpRequest<LoginUserParams>
	): Promise<HttpResponse<string>> {
		const { body } = request;

		try {
			const result = await this.repository.login(body);

			if ("message" in result) {
				return {
					statusCode: 400,
					body: result,
				};
			}

			if ("password" in result && result.password != body.password) {
				return {
					statusCode: 400,
					body: {
						message: "Senha incorreta",
					},
				};
			}

			const jwt = new JWT();

			return {
				statusCode: 200,
				body: await jwt.code(result),
			};
		} catch (error) {}
	}
}