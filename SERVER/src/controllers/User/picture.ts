import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IPictureRepository, PictureParams } from "./protocols";

export class PictureController implements IController {
	constructor(private readonly repository: IPictureRepository) {}
	async handle(
		request?: HttpRequest<PictureParams>
	): Promise<HttpResponse<void>> {
		const { body } = request;

		try {
			const result = await this.repository.change(body);

			if (result && "message" in result) {
				return {
					statusCode: 400,
					body: result,
				};
			}

			return {
				statusCode: 200,
				body: {
					message: "Foto atualizada com sucesso",
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