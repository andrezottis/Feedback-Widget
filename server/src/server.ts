import express from 'express'
import { prisma } from  './prisma'
const app = express();

app.use(express.json());


app.post('/feedbacks', async (req, res)=> {
const {type, comment, screenshot} = req.body;

    const feedbackFromDB = await prisma.feedback.create({
        data: {
            type: type, //poderia usar short sintax aode seria apenas type, sem o :
            comment: comment,
            screenshot: screenshot,
        }
    })


    return res.status(201).json(feedbackFromDB);
})

app.listen(3333, () => {
    console.log('HTTP Server running.');
});