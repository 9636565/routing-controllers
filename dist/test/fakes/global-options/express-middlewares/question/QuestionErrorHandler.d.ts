import { ExpressErrorMiddlewareInterface } from "../../../../../src/driver/express/ExpressErrorMiddlewareInterface";
export declare class QuestionErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next?: (err?: any) => any): any;
}
