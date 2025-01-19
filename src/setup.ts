import SendGrid from "@sendgrid/mail";

export function setup() {
  const {
    LOGIN_URL,
    LOGIN_EMAIL,
    LOGIN_PASSWORD,
    CLASS_FINDER_BUTTON_TITLE,
    SENDGRID_API_KEY,
    SENDGRID_EMAIL_FROM,
    SENDGRID_EMAIL_RECIPIENT,
    SENDGRID_EMAIL_TEMPLATE_ID,
  } = process.env;

  if (
    !LOGIN_URL ||
    !LOGIN_EMAIL ||
    !LOGIN_PASSWORD ||
    !CLASS_FINDER_BUTTON_TITLE ||
    !SENDGRID_API_KEY ||
    !SENDGRID_EMAIL_FROM ||
    !SENDGRID_EMAIL_RECIPIENT ||
    !SENDGRID_EMAIL_TEMPLATE_ID
  ) {
    throw new Error("Missing environment variables");
  }

  setupEmail(SENDGRID_API_KEY);

  return {
    loginUrl: LOGIN_URL,
    loginEmail: LOGIN_EMAIL,
    loginPassword: LOGIN_PASSWORD,
    classFinderButtonTitle: CLASS_FINDER_BUTTON_TITLE,
    sendgridApiKey: SENDGRID_API_KEY,
    sendgridEmailFrom: SENDGRID_EMAIL_FROM,
    sendgridEmailRecipient: SENDGRID_EMAIL_RECIPIENT,
    sendgridEmailTemplateId: SENDGRID_EMAIL_TEMPLATE_ID,
  };
}

function setupEmail(sendgridApiKey: string) {
  SendGrid.setApiKey(sendgridApiKey);
}
