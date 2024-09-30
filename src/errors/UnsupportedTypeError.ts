export class UnsupportedTypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnsupportedTypeError';
    }
}