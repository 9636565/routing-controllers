/// <reference types="express" />
import "reflect-metadata";
import { Request } from "express";
export declare class UserController {
    getAll(): {
        id: number;
        name: string;
    }[];
    getOne(request: Request): string;
    post(request: Request): string;
    put(request: Request): string;
    patch(request: Request): string;
    remove(request: Request): string;
}
