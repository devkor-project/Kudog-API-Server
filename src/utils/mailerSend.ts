import { MailerSend } from 'mailer-send-ts';

export default new MailerSend({ apiKey: process.env.MAILERSEND_APIKEY });
