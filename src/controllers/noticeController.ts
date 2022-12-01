import { NextFunction, Request, Response } from 'express';
import * as noticeService from '@/services/noticeService';
import { getNoticesDto } from '@/interfaces/noticeDto';

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
    const categoryId = Number(req.query.categoryId);
    const getNoticesParams: getNoticesDto = { userId, categoryId };
    const getNoticesResult = await noticeService.getNotices(getNoticesParams);

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

/** kudog 공지사항 조회 API
 * @method get
 * @url /notices/admin
 * @return_data admin notice data
 */
export async function getAdminNotices(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getAdminNoticesResult = await noticeService.getAdminNotices();

    res.send(getAdminNoticesResult);
  } catch (err) {
    next(err);
  }
}

/** 공지사항 검색 API
 * @method get
 * @url /notices/search
 * @return_data notices data
 */
export async function searchNotices(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req;
    const keyword = req.query.keyword as string;
    const getNoticesResult = await noticeService.searchNotices(userId, keyword);

    res.send(getNoticesResult);
  } catch (err) {
    next(err);
  }
}
