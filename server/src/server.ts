import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from  './prisma'
const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "af0647aace7b16",
      pass: "0b8a3b7df9c560"
    }
  });

app.post('/feedbacks', async (req, res)=> {
const {type, comment, screenshot} = req.body;

    const feedbackFromDB = await prisma.feedback.create({
        data: {
            type: type, //poderia usar short sintax aode seria apenas type, sem o :
            comment: comment,
            screenshot: screenshot,
        }
    })

    await transport.sendMail({
        from:'Equipe Feedwidget <oi@feedwidget.com>',
        to:'Andre <andre@feedwidget.com>',
        subject: "Novo feedback recebido",
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do Feedback: ${type} </p>`,
            `<p>Comentário: ${comment} </p>`,
            `<p>Screenshot: ${screenshot} </p>`,
            `</div>`
        ].join('\n')
    });

    return res.status(201).json(feedbackFromDB);
})

app.listen(3333, () => {
    console.log('HTTP Server running.');
});