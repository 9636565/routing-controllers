import { ExpressErrorMiddlewareInterface } from "../../../../../src/driver/express/ExpressErrorMiddlewareInterface";
export declare class PostErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next?: Function): void;
}
