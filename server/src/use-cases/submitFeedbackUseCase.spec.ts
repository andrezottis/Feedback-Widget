import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

//spies - make that all functions that matters are called.
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64.apsokdaposkdpaoskdopask",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should be fail to submit a feedback due to invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "ssk.jpg",
      })
    ).rejects.toThrow();
  });

  it("should be fail to submit a feedback due to invalid type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64.apsokdaposkdpaoskdopask",
      })
    ).rejects.toThrow();
  });

  it("should be fail to submit a feedback due to invalid comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "Other",
        comment: "",
        screenshot: "data:image/png;base64.apsokdaposkdpaoskdopask",
      })
    ).rejects.toThrow();
  });
});
