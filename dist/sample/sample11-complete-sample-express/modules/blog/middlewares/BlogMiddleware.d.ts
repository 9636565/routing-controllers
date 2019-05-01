import { ExpressMiddlewareInterface } from "../../../../../src/driver/express/ExpressMiddlewareInterface";
export declare class BlogMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next?: Function): any;
}
