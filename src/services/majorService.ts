/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ServiceResult from '@/interfaces/common';
import AppDataSource from '@/config/data-source';
import { majorDto } from '@/interfaces/majorDto';
import Major from '@/entities/Major';

// eslint-disable-next-line import/prefer-default-export
export const getMajors = async function ():
  Promise<ServiceResult<majorDto[]>> {
  const getMajorsResult = await AppDataSource.getRepository(Major)
    .find();

  return { data: getMajorsResult };
};
