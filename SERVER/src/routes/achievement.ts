import { FastifyInstance } from "fastify";
import { AddAchievementParams, ConnectAchievementParams } from "../controllers/Achievement/protocols.ts";
import AddAchievementRepository from "../repositories/Achievement/add";
import AddAchievementController from "../controllers/Achievement/add";
import ConnectAchievementRepository from "../repositories/Achievement/connect";
import ConnectAchievementController from "../controllers/Achievement/connect";

export default async function Achievement(app: FastifyInstance): Promise<void> {
	app.post("/achievement", async (request, reply) => {
		const Body = request.body as AddAchievementParams;

		const Repository = new AddAchievementRepository();
		const Controller = new AddAchievementController(Repository);

		try {
			const { body, statusCode } = await Controller.handle({
				body: Body,
			});

			reply.code(statusCode).send(body);
		} catch (error) {
			reply.code(500).send(error);
		}
	});

	app.post("/connect", async (request, reply) => {
		const Body = request.body as ConnectAchievementParams;

		const Repository = new ConnectAchievementRepository();
		const Controller = new ConnectAchievementController(Repository);

		try {
			const { body, statusCode } = await Controller.handle({
				body: Body,
			});

			reply.code(statusCode).send(body);
		} catch (error) {
			reply.code(500).send(error);
		}
	})
}