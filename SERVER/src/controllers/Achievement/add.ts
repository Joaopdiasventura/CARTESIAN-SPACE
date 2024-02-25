import { HttpRequest, HttpResponse, IController, Message } from "../protocols";
import {
	AddAchievementParams,
	IAddAchievementRepository,
} from "./protocols.ts";

export default class AddAchievementController implements IController {
	constructor(private readonly repository: IAddAchievementRepository) {}
	async handle(
		request?: HttpRequest<AddAchievementParams>
	): Promise<HttpResponse<Message>> {
		const { body } = request;

		try {
			const result = await this.repository.add(body);

			if (result) {
				return {
					statusCode: 400,
					body: result
				}
			}
			
			return {
				statusCode: 201,
				body: {
					message: "Conquista criada",
				},
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: error,
			};
		}
	}
}