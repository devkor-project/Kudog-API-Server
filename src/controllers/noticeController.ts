import { NextFunction, Request, Response } from 'express';
import * as noticeService from '@/services/noticeService';

/** 메인 화면 API
 * @method get
 * @url /notices
 * @return_data notices data
 */
export async function getNotices(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getNoticesResult = await noticeService.getNotices();

    res.send(getNoticesResult);
  } catch (err) {
    next(err);
  }
}

/** 상세 페이지 API
 * @method get
 * @url /notices/:noticeId
 * @query email
 * @return_data out_date or already exist error
 */
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
