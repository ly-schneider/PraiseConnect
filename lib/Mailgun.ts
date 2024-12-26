import Mailgun from "mailgun.js";

export interface MailgunClientConfig {
  domain: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  mailgun: ReturnType<typeof Mailgun>;
}

export default function MailgunClient(): MailgunClientConfig | null {
  const API_KEY: string = process.env.MAILGUN_API_KEY || "";
  const DOMAIN: string = process.env.MAILGUN_DOMAIN || "";

  if (API_KEY === "" || DOMAIN === "") {
    return null;
  }

  return {
    domain: DOMAIN,
    mailgun: new Mailgun(FormData).client({
      url: "https://api.eu.mailgun.net",
      username: "api",
      key: API_KEY,
    }),
  };
}
