import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  private feedbacksRepository: FeedbacksRepository;
  private mailAdapter: MailAdapter;

  constructor(
    feedbacksRepository: FeedbacksRepository,
    mailAdapter: MailAdapter
  ) {
    this.feedbacksRepository = feedbacksRepository;
    this.mailAdapter = mailAdapter;
  }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error('Type is required.');
    }

    if(!comment){
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screeshot format.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do Feedback: ${type} </p>`,
        `<p>Comentário: ${comment} </p>`,
        `<p>Screenshot: ${screenshot} </p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
