import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacksRepository";



export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({type, comment, screenshot}: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type: type, //poderia usar short sintax aode seria apenas type, sem o :
                comment: comment,
                screenshot: screenshot,
            }
        });
    }
}