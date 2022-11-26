import ServiceResult from '@/interfaces/common';
import logger from '@/config/winston';
import CategoryPerUser from '@/entities/CategoryPerUser';
import { categoryDto } from '@/interfaces/categoryDto';
import AppDataSource from '@/config/data-source';
import Category from '@/entities/Category';

export const getCategoryList = async (userId: number): Promise<ServiceResult<categoryDto[]>> => {
  const categoryList = await CategoryPerUser.find({
    where: { userId },
  });
  const result = categoryList.map((category) => {
    const { categoryId } = category;
    const { categoryName } = category.category;
    return {
      categoryId,
      categoryName,
    };
  });
  logger.info('get category list success', userId, result);
  return {
    data: result,
  };
};

export const subscribeCategory = async (userId: number, categoryId: number):
  Promise<ServiceResult<string>> => {
  const category = await CategoryPerUser.findOne({
    where: { userId, categoryId },
  });
  if (category) {
    await category.remove();
    logger.info('remove category success', userId, categoryId);
    return {
      data: 'removed',
    };
  }
  const newCategory = new CategoryPerUser();
  newCategory.userId = userId;
  newCategory.categoryId = categoryId;
  await newCategory.save();
  logger.log('info', 'add category success', userId, categoryId);
  return {
    data: 'subscribed',
  };
};

export const getAllCategoryList = async (): Promise<ServiceResult<categoryDto[]>> => {
  const categoryList = await AppDataSource.getRepository(Category)
    .createQueryBuilder('c')
    .select(['c.categoryId as categoryId', 'c.categoryName as categoryName'])
    .getRawMany();

  return {
    data: categoryList,
  };
};
