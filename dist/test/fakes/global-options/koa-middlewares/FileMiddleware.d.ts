import { ExpressMiddlewareInterface } from "../../../../src/driver/express/ExpressMiddlewareInterface";
export declare class FileMiddleware implements ExpressMiddlewareInterface {
    use(context: any, next?: (err?: any) => Promise<any>): Promise<any>;
}
