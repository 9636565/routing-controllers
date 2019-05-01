import { ExpressMiddlewareInterface } from "../../../../../src/driver/express/ExpressMiddlewareInterface";
export declare class QuestionMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next?: (err?: any) => any): any;
}
