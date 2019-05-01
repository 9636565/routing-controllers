export declare class ValidationError extends Error {
    name: string;
    message: string;
    errors: string[];
}
export declare class BlogController {
    getAll(): void;
    getOne(): void;
}
