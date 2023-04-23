"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (message, data, code, status, error, env) => {
    var _a;
    if (status === void 0) { status = true; }
    if (error === void 0) { error = ''; }
    if (env === void 0) { env = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.ENV; }
    return new Promise((resolve, reject) => {
        let payload = {
            message,
            data,
            code,
            status,
            error,
            env,
        };
        resolve(payload);
    });
};
exports.default = response;
//# sourceMappingURL=response.js.map