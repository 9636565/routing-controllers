export declare class FakeService {
    fileMiddlewareCalled: boolean;
    videoMiddlewareCalled: boolean;
    questionMiddlewareCalled: boolean;
    questionErrorMiddlewareCalled: boolean;
    postMiddlewareCalled: boolean;
    fileMiddleware(): void;
    videoMiddleware(): void;
    questionMiddleware(): void;
    questionErrorMiddleware(): void;
    postMiddleware(): void;
    reset(): void;
}
export declare const defaultFakeService: FakeService;
