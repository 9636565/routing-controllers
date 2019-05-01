export interface BlogFilter {
    keyword: string;
    limit: number;
    offset: number;
}
export declare class BlogController {
    getAll(filter: BlogFilter): {
        id: number;
        name: string;
    }[];
    getOne(id: number, name: string): {
        id: number;
        name: string;
    };
    post(blog: any): string;
    put(id: number): string;
    patch(id: number): string;
    remove(id: number): string;
}
