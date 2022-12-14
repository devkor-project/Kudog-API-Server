import ServiceResult from '@/interfaces/common';
import logger from '@/config/winston';
import CategoryPerUser from '@/entities/CategoryPerUser';
import Category from '@/entities/Category';
import { In } from 'typeorm';
import { categoryDto } from '@/interfaces/categoryDto';
import AppDataSource from '@/config/data-source';

export const getAllCategories = async (): Promise<ServiceResult<categoryDto[]>> => {
  const categoryList = await Category.find();
  const result = categoryList.map((category) => {
    const { categoryId, categoryName, provider } = category;
    return {
      categoryId,
      categoryName,
      provider,
    };
  });
  logger.info('get category list success', result);
  return {
    data: result,
  };
};

export const getCategoryList = async (userId: number): Promise<ServiceResult<categoryDto[]>> => {
  const categoryList = await CategoryPerUser.find({
    where: { userId },
  });
  const result = await AppDataSource.getRepository(CategoryPerUser)
    .createQueryBuilder('cp')
    .innerJoinAndSelect('cp.category', 'c')
    .select(['c.categoryId AS categoryId', 'c.categoryName AS categoryName', 'c.provider AS provider'])
    .where('cp.userId = :userId', { userId })
    .orderBy('c.provider')
    .getRawMany();

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

export const subscribeCategories = async (
  userId: number,
  removeCatIds: number[],
  newCatIds: number[],
):
  Promise<ServiceResult<boolean>> => {
  await CategoryPerUser.delete({ userId, categoryId: In(removeCatIds) });
  const newCategories = newCatIds.map((categoryId) => {
    const category = new CategoryPerUser();
    category.userId = userId;
    category.categoryId = categoryId;
    return category;
  });
  await CategoryPerUser.save(newCategories);
  return { data: true };
};
