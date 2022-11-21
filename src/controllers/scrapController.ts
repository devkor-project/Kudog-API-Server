import { NextFunction, Request, Response } from 'express';
import * as scrapService from '@/services/scrapService';

/** 스크랩 목록 조회 API
 * @method get
 * @url /scraps
 * @return_data scraps data
 */
// eslint-disable-next-line import/prefer-default-export
export async function getScraps(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req;
    const getScrapsResult = await scrapService.getScraps(userId);

    res.send(getScrapsResult);
  } catch (err) {
    next(err);
  }
}
