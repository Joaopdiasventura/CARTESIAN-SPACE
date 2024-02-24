import { Message } from "../protocols";

export interface AddPointParams {
	score: number;
	exercise: string;
	fk_user_email: string;
}

export interface IAddPointRepository{
    add(params: AddPointParams): Promise<number | Message>
}