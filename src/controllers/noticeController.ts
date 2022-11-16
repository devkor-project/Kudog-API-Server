import { NextFunction, Request, Response } from 'express';
import * as noticeService from '@/services/noticeService';

/** 상세 페이지 API
 * @method get
 * @url /notices/:noticeId
 * @query email
 * @return_data out_date or already exist error
 */
// eslint-disable-next-line import/prefer-default-export
export const getNotice = async (
  req: Request<Record<string, never>, Record<string, never>, { noticeId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getNoticeResult = await noticeService.getNotice(req.params.noticeId);
    res.send(getNoticeResult);
  } catch (err) {
    next(err);
  }
};
