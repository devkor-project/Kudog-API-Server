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
    const { userId } = req;
    const getNoticesResult = await noticeService.getNotices(userId);

    res.send(getNoticesResult);
  } catch (err) {
    next(err);
  }
}

/** 상세 페이지 API
 * @method get
 * @url /notices/:noticeId
 * @query noticeId
 * @return_data one notice data
 */
export const getNotice = async (
  req: Request<Record<string, never>, Record<string, never>, { noticeId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req;
    const getNoticeResult = await noticeService.getNotice(req.params.noticeId, userId);
    res.send(getNoticeResult);
  } catch (err) {
    next(err);
  }
};

/** 인기 공지사항 조회 API
 * @method get
 * @url /notices/hot
 * @return_data notice data sorted by view count
 */
export async function getHotNotices(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req;
    const getHotNoticesResult = await noticeService.getHotNotices(userId);

    res.send(getHotNoticesResult);
  } catch (err) {
    next(err);
  }
}
