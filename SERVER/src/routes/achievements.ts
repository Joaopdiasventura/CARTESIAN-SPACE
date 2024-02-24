import { FastifyInstance } from "fastify";
import { AddAchievementParams } from "../controllers/Achievements/protocols.ts";
import AddAchievementRepository from "../repositories/Achievements/add";
import AddAchievementController from "../controllers/Achievements/add";

export default async function Achievement (app: FastifyInstance): Promise<void>{
    app.post("/achievement", async (request, reply) => {
        const Body = request.body as AddAchievementParams

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
    })
}