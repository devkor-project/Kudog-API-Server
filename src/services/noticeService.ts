import ServiceResult, * as common from '@/interfaces/common';
import AppDataSource from '@/config/data-source';
import logger from '@/config/winston';
import { noticeDto } from '@/interfaces/noticeDto';
import Notice from '@/entities/Notice';

// eslint-disable-next-line import/prefer-default-export
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
