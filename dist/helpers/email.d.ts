interface emailDTO {
    from?: string;
    to: string;
    subject: string;
    html: string;
}
declare const sendEmail: ({ from, to, subject, html, }: emailDTO) => Promise<void>;
export default sendEmail;
