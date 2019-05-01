/// <reference types="express" />
import { Request } from "express";
export declare class QuestionController {
    getAll(): Promise<any>;
    getOne(id: number): Promise<any>;
    post(request: Request): Promise<any>;
    put(request: Request): Promise<any>;
    patch(request: Request): Promise<any>;
    remove(request: Request): Promise<any>;
    private createPromise(data, timeout);
}
