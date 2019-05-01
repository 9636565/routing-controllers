/// <reference types="express" />
import { Request } from "express";
export declare class BlogController {
    getAll(): Promise<any>;
    getOne(): Promise<any>;
    post(request: Request): Promise<any>;
    put(request: Request): Promise<any>;
    patch(request: Request): Promise<any>;
    remove(request: Request): Promise<any>;
    /**
     * Creates a fake promise with timeout.
     */
    private createPromise(data, timeout);
}
