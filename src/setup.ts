export function setup() {
  const { LOGIN_URL, LOGIN_EMAIL, LOGIN_PASSWORD, CLASS_FINDER_BUTTON_TITLE } =
    process.env;

  if (
    !LOGIN_URL ||
    !LOGIN_EMAIL ||
    !LOGIN_PASSWORD ||
    !CLASS_FINDER_BUTTON_TITLE
  ) {
    throw new Error("Missing environment variables");
  }

  return {
    loginUrl: LOGIN_URL,
    loginEmail: LOGIN_EMAIL,
    loginPassword: LOGIN_PASSWORD,
    classFinderButtonTitle: CLASS_FINDER_BUTTON_TITLE,
  };
}
