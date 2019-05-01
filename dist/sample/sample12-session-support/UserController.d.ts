/// <reference types="express" />
/// <reference types="express-session" />
import "reflect-metadata";
import { Request } from "express";
export declare class UserController {
    getAll(): {
        id: number;
        name: string;
    }[];
    getOne(user: any): any;
    post(request: Request): string;
    put(id: number, session: Express.Session): string;
    patch(request: Request): string;
    remove(request: Request): string;
}
