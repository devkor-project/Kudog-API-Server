/* eslint-disable import/prefer-default-export */
import { EmailParams, Sender, Recipient } from 'mailer-send-ts';
import mailerSend from '@/utils/mailerSend';
import { NextFunction, Request, Response } from 'express';
/**
 * 메일 전송 API - 미완성
 * @method post
 * @url /mail/sned
 * @body user : 메일 전송할 유저들의 리스트 or 정보 (미정)
 * @return_data 미정
 */
export async function sendMail(
  req: Request<Record<string, never>, Record<string, never>, { user: object }>,
  res: Response,
  next: NextFunction,
) {
  try {
    /** bulk sending 전략
     * 1. userData를 통해서 recipient 동적으로 구성
     * 2. 해당 recipient로 emailParams 생성
     * 3. bulkEmails: EmailParams[] = []; 선언 이후 해당 emailParams를 push
     * 4. await mailerSend.email.sendBulk(bulkEmails)
     */

    // 아직 smtp server 측에서 승인이 안 나옴
    // 현재 미완성, 기본 틀만 잡아둠

    // recipient 생성에 이용
    const userData = req.body;

    // recipient 담아둘 배열
    const bulkEmails: EmailParams[] = [];

    // 발신자 정보
    const sentFrom = new Sender('kudogEmail@gmail.com', 'kudog');

    // 수신자 1
    const recipient = [
      new Recipient('cksgh1735@gmail.com', 'park chanho'),
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipient)
      .setSubject('subject')
      .setText('hello world')
      .setHtml('<b>hi</b>'); // 템플릿 사용 가능 .setTemplateId("your_template_id");

    bulkEmails.push(emailParams);

    // 발송 요청
    const response = await mailerSend.email.sendBulk(bulkEmails);

    // response 이용

    res.send('pass');
  } catch (err) {
    next(err);
  }
}
