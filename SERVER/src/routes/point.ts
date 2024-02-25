import { FastifyInstance } from "fastify";
import { AddPointParams } from "../controllers/Point/protocols";
import AddPointRepository from "../repositories/Point/add";
import AddPointController from "../controllers/Point/add";
import GetRankingRepository from "../repositories/Point/get";
import GetRankingController from "../controllers/Point/get";

export default async function Point(app: FastifyInstance) {
    app.post("/point", async (request, reply) => {
        const Body = request.body as AddPointParams;

        const Repository = new AddPointRepository();
        const Controller = new AddPointController(Repository);

		try {
			const { body, statusCode } = await Controller.handle({
				body: Body,
			});

			reply.code(statusCode).send(body);
		} catch (error) {
			reply.code(500).send(error);
		}
    });

	app.get("/", async (request, reply) => {
		
		const Repository = new GetRankingRepository();
		const Controller = new GetRankingController(Repository);

		try {
			const { body, statusCode } = await Controller.handle();

			reply.code(statusCode).send(body);
		} catch (error) {
			reply.code(500).send(error);
		}
	});
}