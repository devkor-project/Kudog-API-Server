/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ServiceResult, * as common from '@/interfaces/common';
import AppDataSource from '@/config/data-source';
import { noticeDto, simpleNoticeDto } from '@/interfaces/noticeDto';
import Notice from '@/entities/Notice';
import User from '@/entities/User';
import Scrap from '@/entities/Scrap';
import { updateScrapDto } from '@/interfaces/scrapDto';
import { SCRAP_EXISTS, SCRAP_NOT_EXISTS } from '@/interfaces/error';

export const getScraps = async function (userId: number):
  Promise<ServiceResult<simpleNoticeDto[]>> {
  const getNoticesResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .innerJoinAndSelect('n.category', 'c')
    .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
      .from(Scrap, 's')
      .innerJoin(User, 'u', 's.userId = u.userId')
      .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
    .innerJoin('n.scraps', 's')
    .innerJoin('s.user', 'u')
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'n.date AS date', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .where('u.userId = :userId', { userId })
    .getRawMany();

  return { data: getNoticesResult };
};

export const updateScrap = async function (updateParams: updateScrapDto):
  Promise<void> {
  const { whetherScrap, noticeId, userId } = updateParams;
  const scrap = await AppDataSource
    .getRepository(Scrap)
    .find({
      where: {
        noticeId,
        userId,
      },
    });
  if (whetherScrap) {
    if (scrap.length !== 0) {
      throw SCRAP_EXISTS;
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Scrap)
      .values({
        noticeId,
        userId,
      })
      .execute();
  } else {
    if (scrap.length === 0) {
      throw SCRAP_NOT_EXISTS;
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Scrap)
      .where('noticeId = :noticeId AND userId = :userId', {
        noticeId,
        userId,
      })
      .execute();
  }
};
