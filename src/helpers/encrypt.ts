import CryptoJS from 'crypto-js';
class Encrypter {
  key: string;
  constructor() {
    this.key = process.env.SECRET;
  }

  async encrypt(clearText: string) {
    // console.log(clearText);
    let encrypted = CryptoJS.AES.encrypt(clearText, this.key).toString();
    // console.log(encrypted);
    let result = encrypted.replace(/\//g, '----');
    // console.log(result);
    return result;
  }

  decrypt(encryptedText: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = encryptedText.replace(/----/g, '/');
        let decrypted = CryptoJS.AES.decrypt(result, this.key);
        let originalText = decrypted.toString(CryptoJS.enc.Utf8);
        let data: { time: number; email: string } = JSON.parse(originalText);
        return resolve({
          message: 'Success',
          time: data.time,
          status: true,
        });
      } catch (error) {
        return reject({ message: 'Invalid Link', status: false });
      }
    });
  }
}
const Generator = new Encrypter();
export default Generator;
