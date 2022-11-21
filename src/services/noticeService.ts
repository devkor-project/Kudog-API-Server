/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ServiceResult, * as common from '@/interfaces/common';
import AppDataSource from '@/config/data-source';
import { noticeDto } from '@/interfaces/noticeDto';
import Notice from '@/entities/Notice';
import User from '@/entities/User';
import Scrap from '@/entities/Scrap';

export const getNotices = async function (userId: number):
  Promise<ServiceResult<noticeDto[]>> {
  const getNoticesResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .innerJoinAndSelect('n.category', 'c')
    .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
      .from(Scrap, 's')
      .innerJoin(User, 'u', 's.userId = u.userId')
      .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'n.content AS content', 'n.writer AS writer', 'n.date AS date', 'n.url AS url', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .getRawMany();

  return { data: getNoticesResult };
};

export const getNotice = async function (noticeId: number, userId: number):
  Promise<ServiceResult<noticeDto>> {
  await AppDataSource.createQueryBuilder()
    .update(Notice)
    .set({
      viewCount: () => 'viewCount + 1',
    })
    .where('noticeId = :noticeId', { noticeId })
    .execute();

  const getNoticeResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .innerJoinAndSelect('n.category', 'c')
    .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
      .from(Scrap, 's')
      .innerJoin(User, 'u', 's.userId = u.userId')
      .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'n.content AS content', 'n.writer AS writer', 'n.date AS date', 'n.url AS url', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .where('n.noticeId = :noticeId', { noticeId })
    .getRawOne();

  return { data: getNoticeResult };
};

export const getHotNotices = async function (userId: number):
  Promise<ServiceResult<noticeDto[]>> {
  const getHotNoticesResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .innerJoinAndSelect('n.category', 'c')
    .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
      .from(Scrap, 's')
      .innerJoin(User, 'u', 's.userId = u.userId')
      .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'n.content AS content', 'n.writer AS writer', 'n.date AS date', 'n.url AS url', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .orderBy('n.viewCount', 'DESC')
    .limit(20)
    .getRawMany();

  return { data: getHotNoticesResult };
};
