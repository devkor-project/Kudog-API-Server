import { NextFunction, Request, Response } from 'express';
import * as scrapService from '@/services/scrapService';
import { updateScrapDto } from '@/interfaces/scrapDto';

/** 스크랩 목록 조회 API
 * @method get
 * @url /scraps
 * @return_data scraps data
 */
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

/** 스크랩 등록 및 해제 API
 * @method put
 * @url /scraps/:scrapId
 * @body { whetherScrap }
 * @return_data success message
 */
export async function updateScrap(
  // eslint-disable-next-line max-len
  req: Request<Record<string, never>, Record<number, never>, { whetherScrap: boolean, noticeId: number }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req;
    const { noticeId } = req.params;
    const { whetherScrap } = req.body;
    const updateParams: updateScrapDto = { whetherScrap, noticeId, userId };

    await scrapService.updateScrap(updateParams);

    res.send({ success: true });
  } catch (err) {
    next(err);
  }
}
