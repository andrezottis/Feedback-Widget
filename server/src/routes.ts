import express from "express";
import nodemailer from "nodemailer";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./use-cases/submitFeedbackUseCase";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "af0647aace7b16",
    pass: "0b8a3b7df9c560",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  // await transport.sendMail({
  //     from:'Equipe Feedwidget <oi@feedwidget.com>',
  //     to:'Andre <andre@feedwidget.com>',
  //     subject: "Novo feedback recebido",
  //     html: [
  //         `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
  //         `<p>Tipo do Feedback: ${type} </p>`,
  //         `<p>Comentário: ${comment} </p>`,
  //         `<p>Screenshot: ${screenshot} </p>`,
  //         `</div>`
  //     ].join('\n')
  // });

  return res.status(201).send();
});
