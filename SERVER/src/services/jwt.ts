import jwt from "jsonwebtoken";

export default class JWT {

	async code(params: any): Promise<string> {
    const secretKey = process.env.SECRET_KEY;
    const token: string = await jwt.sign(params, secretKey);
    return token
    }

	decode(params: string): any {}

}
