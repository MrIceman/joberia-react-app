
export class ResponseEntity {
    constructor(
        public readonly statusCode: number,
        public readonly body?: any,
        public readonly headers?: any,
        public readonly contentType?: any
    ) {
    }
}
