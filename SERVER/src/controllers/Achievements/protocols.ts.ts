import { Message } from "../protocols";

export interface AddAchievementParams {
    fk_user_email: string;
    description: string;
    name: string;
}

export interface IAddAchievementRepository {
    add(params: AddAchievementParams) : Promise<void | Message>;
}