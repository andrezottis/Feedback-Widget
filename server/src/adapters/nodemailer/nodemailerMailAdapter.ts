import nodemailer from "nodemailer"
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "af0647aace7b16",
    pass: "0b8a3b7df9c560",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedwidget <oi@feedwidget.com>",
      to: "Andre <andre@feedwidget.com>",
      subject: subject,
      html: body,
    });
  }
}
