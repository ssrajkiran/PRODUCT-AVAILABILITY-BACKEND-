"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdformUUID = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const _ = __importStar(require("lodash"));
const prisma = new client_1.PrismaClient();
const getUserIdformUUID = async (uuid, select) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {
                where: {
                    uuid: uuid,
                },
            };
            if (!_.isEmpty(select)) {
                payload['select'] = select;
            }
            const user = await prisma.user.findFirst(payload);
            if (_.isEmpty(user)) {
                reject("user doesn't exists");
            }
            resolve(user);
        }
        catch (error) {
            common_1.Logger.error(error);
            reject(error);
        }
    });
};
exports.getUserIdformUUID = getUserIdformUUID;
//# sourceMappingURL=getuserID.js.map