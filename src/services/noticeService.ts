import ServiceResult, * as common from '@/interfaces/common';
import AppDataSource from '@/config/data-source';
import logger from '@/config/winston';
import { noticeDto } from '@/interfaces/noticeDto';
import Notice from '@/entities/Notice';

export const getNotices = async function ():
  Promise<ServiceResult<noticeDto[]>> {
  const getNoticesResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .leftJoinAndSelect('n.category', 'c')
    .select(['n.noticeId', 'n.title', 'n.content', 'n.writer', 'n.date', 'n.url', 'n.provider', 'n.viewCount'])
    .addSelect('c.categoryName')
    .getMany();

  return { data: getNoticesResult };
};

export const getNotice = async function (noticeId: number):
  Promise<ServiceResult<noticeDto>> {
  const getNoticeResult = await AppDataSource.getRepository(Notice)
    .createQueryBuilder('n')
    .leftJoinAndSelect('n.category', 'c')
    .select(['n.noticeId', 'n.title', 'n.content', 'n.writer', 'n.date', 'n.url', 'n.provider', 'n.viewCount'])
    .addSelect('c.categoryName')
    .where('n.noticeId = :noticeId', { noticeId })
    .getOne();

  return { data: getNoticeResult };
};
