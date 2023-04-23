"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SEND_GRID);
const sendEmail = async ({ from = 'sriram.paramasivam@kprinfo.com', to, subject, html, }) => {
    const msg = {
        from,
        to,
        subject,
        html,
    };
    const mail = await mail_1.default.send(msg);
};
exports.default = sendEmail;
//# sourceMappingURL=email.js.map