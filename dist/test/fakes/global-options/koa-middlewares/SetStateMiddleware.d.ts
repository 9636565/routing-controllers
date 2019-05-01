import { ExpressMiddlewareInterface } from "../../../../src/driver/express/ExpressMiddlewareInterface";
export declare class SetStateMiddleware implements ExpressMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any>;
}
