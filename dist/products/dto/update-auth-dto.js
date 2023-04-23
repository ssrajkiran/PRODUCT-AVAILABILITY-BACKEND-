"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_auth_dto_1 = require("./create-auth-dto");
class UpdateProductTypeDto extends (0, swagger_1.PartialType)(create_auth_dto_1.CreateProductnDto) {
}
exports.UpdateProductTypeDto = UpdateProductTypeDto;
//# sourceMappingURL=update-auth-dto.js.map