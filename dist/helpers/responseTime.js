"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let AppLoggerMiddleware = class AppLoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        response.setHeader('x-powered-by', 'TODI');
        response.on('close', () => {
            let finalString = `\x1b[33m${new Date().toLocaleString()}\x1b[0m \x1b[31m${request.method}\x1b[0m \x1b[36m${request.originalUrl}\x1b[0m \x1b[38;5;11m (${response.statusCode})\x1b[0m`;
            this.logger.log(finalString);
        });
        next();
    }
};
AppLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], AppLoggerMiddleware);
exports.AppLoggerMiddleware = AppLoggerMiddleware;
//# sourceMappingURL=responseTime.js.map