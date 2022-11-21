/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ServiceResult, * as common from '@/interfaces/common';
import AppDataSource from '@/config/data-source';
import { noticeDto, simpleNoticeDto } from '@/interfaces/noticeDto';
import Notice from '@/entities/Notice';
import User from '@/entities/User';
import Scrap from '@/entities/Scrap';

// eslint-disable-next-line import/prefer-default-export
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
