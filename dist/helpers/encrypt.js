"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
class Encrypter {
    constructor() {
        this.key = process.env.SECRET;
    }
    async encrypt(clearText) {
        let encrypted = crypto_js_1.default.AES.encrypt(clearText, this.key).toString();
        let result = encrypted.replace(/\//g, '----');
        return result;
    }
    decrypt(encryptedText) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = encryptedText.replace(/----/g, '/');
                let decrypted = crypto_js_1.default.AES.decrypt(result, this.key);
                let originalText = decrypted.toString(crypto_js_1.default.enc.Utf8);
                let data = JSON.parse(originalText);
                return resolve({
                    message: 'Success',
                    time: data.time,
                    status: true,
                });
            }
            catch (error) {
                return reject({ message: 'Invalid Link', status: false });
            }
        });
    }
}
const Generator = new Encrypter();
exports.default = Generator;
//# sourceMappingURL=encrypt.js.map