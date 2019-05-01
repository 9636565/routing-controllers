import { UserFilter } from "./UserFilter";
import { User } from "./User";
export declare class UserController {
    getAll(filter: UserFilter): "filter has long keyword" | "filter keyword is missing or too short";
    post(user: User): User;
}
