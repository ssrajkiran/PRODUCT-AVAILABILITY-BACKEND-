import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SEND_GRID);

interface emailDTO {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({
  from = 'sriram.paramasivam@kprinfo.com',
  to,
  subject,
  html,
}: emailDTO) => {
  const msg = {
    from,
    to,
    subject,
    html,
  };
  const mail = await sgMail.send(msg);
};
export default sendEmail;
