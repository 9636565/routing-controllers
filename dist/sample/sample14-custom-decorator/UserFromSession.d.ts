/**
 * Simple decorator - re-implementation of CurrentUser decorator.
 */
export declare function UserFromSession(options?: {
    required?: boolean;
}): (object: Object, method: string, index: number) => void;
