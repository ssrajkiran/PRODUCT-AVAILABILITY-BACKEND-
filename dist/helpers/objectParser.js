"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDto = exports.ListDto = exports.prismaFilterOptions = exports.filterOptions = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class filterOptions {
}
exports.filterOptions = filterOptions;
class prismaFilterOptions {
}
exports.prismaFilterOptions = prismaFilterOptions;
const listParser = ({ limit = Number.MAX_SAFE_INTEGER, skip = 0, where = {}, include = {}, select = {}, order = { created_at: 'desc' }, }) => {
    let finalData = {
        take: Number.MAX_SAFE_INTEGER,
        skip: 0,
        where: {},
        orderBy: { created_at: 'desc' },
    };
    finalData[`where`] = where;
    finalData.take = limit;
    finalData.skip = skip;
    finalData.orderBy = order;
    if (Object.keys(select).length !== 0) {
        finalData.select = select;
    }
    if (Object.keys(include).length !== 0) {
        finalData[`include`] = include;
    }
    return finalData;
};
exports.default = listParser;
class ListDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ListDto.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ListDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], ListDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], ListDto.prototype, "where", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], ListDto.prototype, "select", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], ListDto.prototype, "include", void 0);
exports.ListDto = ListDto;
class GetDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetDto.prototype, "uuid", void 0);
exports.GetDto = GetDto;
//# sourceMappingURL=objectParser.js.map