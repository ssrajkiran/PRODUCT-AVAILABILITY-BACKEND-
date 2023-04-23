declare class Encrypter {
    key: string;
    constructor();
    encrypt(clearText: string): Promise<string>;
    decrypt(encryptedText: string): Promise<unknown>;
}
declare const Generator: Encrypter;
export default Generator;
