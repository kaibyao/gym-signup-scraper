import { type ClassOpening } from "./find-classes-page.ts";
import SendGrid, { type MailDataRequired } from "@sendgrid/mail";

export async function sendEmail({
  classOpenings,
  sendgridEmailFrom,
  sendgridEmailRecipient,
  sendgridEmailTemplateId,
}: {
  classOpenings: ClassOpening[];
  sendgridEmailFrom: string;
  sendgridEmailRecipient: string;
  sendgridEmailTemplateId: string;
}) {
  console.log("Sending email...");

  const opts: MailDataRequired = {
    to: sendgridEmailRecipient.split(","),
    from: sendgridEmailFrom,
    subject: "Gym Class Openings",
    templateId: sendgridEmailTemplateId,
    dynamicTemplateData: {
      classOpenings,
    },
  };

  const result = await SendGrid.send(opts);
  console.log(result);
}
