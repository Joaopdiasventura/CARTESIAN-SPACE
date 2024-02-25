import { Message } from "../protocols";

export interface AddPointParams {
	score: number;
	exercise: string;
	fk_user_email: string;
}

export interface Ranking{
	name: string;
	picture: string;
	score: number;
}
export interface IAddPointRepository{
    add(params: AddPointParams): Promise<number | Message>
}

export interface IGetRankingRepository{
	get(): Promise<Ranking[]>
}