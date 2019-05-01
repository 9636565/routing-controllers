import { ExpressMiddlewareInterface } from "../../../src/driver/express/ExpressMiddlewareInterface";
export declare class SessionMiddleware implements ExpressMiddlewareInterface {
    use(requestOrContext: any, responseOrNext: any, next?: (err?: any) => any): any;
    private expSession;
    private koaSession;
}
