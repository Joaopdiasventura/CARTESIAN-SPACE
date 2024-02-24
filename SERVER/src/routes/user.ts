import { FastifyInstance, RouteHandlerMethod } from "fastify";
import multer from "fastify-multer";
import {
	GetUserParams,
	LoginUserParams,
	PictureParams,
	RegisterUserParams,
} from "../controllers/User/protocols";
import RegisterUserRepository from "../repositories/User/register";
import RegisterUserController from "../controllers/User/register";
import PictureRepository from "../repositories/User/picture";
import { PictureController } from "../controllers/User/picture";
import LoginUserRepository from "../repositories/User/login";
import LoginUserController from "../controllers/User/login";
import GetUserController from "../controllers/User/get";
import GetUserRepository from "../repositories/User/get";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async function User(app: FastifyInstance): Promise<void> {
	app.post("/register", async (request, reply) => {
		const Body = request.body as RegisterUserParams;

		const Repository = new RegisterUserRepository();
		const Controller = new RegisterUserController(Repository);

		try {
			const { body, statusCode } = await Controller.handle({
				body: Body,
			});

			reply.code(statusCode).send(body);
		} catch (error) {
			reply.code(500).send(error);
		}
	});

	app.post("/login", async (request, reply) => {
		const Body = request.body as LoginUserParams;

		const Repository = new LoginUserRepository();
		const Controller = new LoginUserController(Repository);

		try {
			const { body, statusCode } = await Controller.handle({
				body: Body,
			});

			reply.code(statusCode).send(body);
		} catch (error) {
			reply.code(500).send(error);
		}
	});

	app.get("/user/:email", async (request, reply) => {
		const Params = request.params as GetUserParams;

		const Repository = new GetUserRepository();
		const Controller = new GetUserController(Repository);

		try {
			const { body, statusCode } = await Controller.handle({
				params: Params
			});

			reply.code(statusCode).send(body);
		} catch (error) {
			reply.code(500).send(error);
		}
	})

	app.put(
		"/picture",
		{ preHandler: upload.single("file") as RouteHandlerMethod },
		async (request, reply) => {
			const req = request as any;

			const Body: PictureParams = {
				email: req.body.email,
				fileObject: req.file,
			};

			const Repository = new PictureRepository();
			const Controller = new PictureController(Repository);

			try {
				const { body, statusCode } = await Controller.handle({
					body: Body,
				});

				reply.code(statusCode).send(body);
			} catch (error) {
				reply.code(500).send(error);
			}
		}
	);
}