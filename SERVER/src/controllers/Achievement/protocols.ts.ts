import { Message } from "../protocols";

export interface AddAchievementParams {
    description: string;
    name: string;
}

export interface ConnectAchievementParams {
    fk_user_email: string;
    fk_achievement_id: number;
}

export interface IAddAchievementRepository {
    add(params: AddAchievementParams) : Promise<void | Message>;
}

export interface IConnectAchievementRepository {
    connect(params: ConnectAchievementParams):Promise<Message>;
}