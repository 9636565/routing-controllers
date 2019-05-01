import "reflect-metadata";
import { User } from "./User";
export declare class QuestionController {
    all(user: User): {
        id: number;
        title: string;
    }[];
}
