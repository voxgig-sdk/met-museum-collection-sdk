"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetMuseumCollectionError = void 0;
class MetMuseumCollectionError extends Error {
    isMetMuseumCollectionError = true;
    sdk = 'MetMuseumCollection';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MetMuseumCollectionError = MetMuseumCollectionError;
//# sourceMappingURL=MetMuseumCollectionError.js.map