/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ServiceResult, * as common from '@/interfaces/common';
import AppDataSource from '@/config/data-source';
import {
  getNoticesDto, noticeDto, searchNoticesDto, simpleNoticeDto,
} from '@/interfaces/noticeDto';
import Notice from '@/entities/Notice';
import User from '@/entities/User';
import Scrap from '@/entities/Scrap';
import Category from '@/entities/Category';
import { CATEGORY_NAME_DOES_NOT_EXISTS } from '@/interfaces/error';
import AdminNotice from '@/entities/AdminNotice';

export const getNotices = async function (getNoticesParams: getNoticesDto):
  Promise<ServiceResult<simpleNoticeDto[]>> {
  const { userId, categoryId } = getNoticesParams;

  if (categoryId) {
    const category = await Category.findOne({
      where: { categoryId },
    });
    if (!category) {
      throw CATEGORY_NAME_DOES_NOT_EXISTS;
    }

    const getNoticesResult = await AppDataSource.getRepository(Notice)
      .createQueryBuilder('n')
      .innerJoinAndSelect('n.category', 'c')
      .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
        .from(Scrap, 's')
        .innerJoin(User, 'u', 's.userId = u.userId')
        .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
      .select(['n.noticeId AS noticeId', 'n.title AS title', 'date_format(n.date, \'%Y-%m-%d\') as date', 'n.provider AS provider', 'n.viewCount AS viewCount'])
      .addSelect('c.categoryName AS categoryName')
      .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
      .where('n.categoryId = :categoryId', { categoryId })
      .orderBy('n.date', 'DESC')
      .getRawMany();

    return { data: getNoticesResult };
  }

  // 카테고리 filtering 없이 전체 불러오기
  const getNoticesResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .innerJoinAndSelect('n.category', 'c')
    .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
      .from(Scrap, 's')
      .innerJoin(User, 'u', 's.userId = u.userId')
      .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'date_format(n.date, \'%Y-%m-%d\') as date', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .orderBy('n.date', 'DESC')
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
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'n.content AS content', 'n.writer AS writer', 'date_format(n.date, \'%Y-%m-%d\') as date', 'n.url AS url', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .where('n.noticeId = :noticeId', { noticeId })
    .getRawOne();

  return { data: getNoticeResult };
};

export const getHotNotices = async function (userId: number):
  Promise<ServiceResult<simpleNoticeDto[]>> {
  const getHotNoticesResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .innerJoinAndSelect('n.category', 'c')
    .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
      .from(Scrap, 's')
      .innerJoin(User, 'u', 's.userId = u.userId')
      .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'date_format(n.date, \'%Y-%m-%d\') as date', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .orderBy('n.viewCount', 'DESC')
    .limit(20)
    .getRawMany();

  return { data: getHotNoticesResult };
};

export const getAdminNotices = async function ():
  Promise<ServiceResult<simpleNoticeDto[]>> {
  const getHotNoticesResult = await AppDataSource.getRepository(AdminNotice)
    .createQueryBuilder('a')
    .select(['a.adminNoticeId as adminNoticeId', 'a.title as title', 'a.content as content', 'a.writer as writer', 'a.createdAt as createdAt'])
    .getRawMany();

  return { data: getHotNoticesResult };
};

export const searchNotices = async function (searchParams: searchNoticesDto):
  Promise<ServiceResult<simpleNoticeDto[]>> {
  const {
    userId, keyword, categoryName, provider,
  } = searchParams;
  const searchNoticesResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .innerJoinAndSelect('n.category', 'c')
    .leftJoinAndSelect((subQuery) => subQuery.select('noticeId')
      .from(Scrap, 's')
      .innerJoin(User, 'u', 's.userId = u.userId')
      .where('u.userId = :userId', { userId }), 'sc', 'n.noticeId = sc.noticeId')
    .select(['n.noticeId AS noticeId', 'n.title AS title', 'date_format(n.date, \'%Y-%m-%d\') as date', 'n.provider AS provider', 'n.viewCount AS viewCount'])
    .addSelect('c.categoryName AS categoryName')
    .addSelect('case when n.noticeId = sc.noticeId then \'Y\' else \'N\' end as isScraped')
    .where('title like :word', { word: `%${keyword}%` })
    .andWhere('c.categoryName = :categoryName', { categoryName })
    .andWhere('c.provider = :provider', { provider })
    .getRawMany();

  return { data: searchNoticesResult };
};
