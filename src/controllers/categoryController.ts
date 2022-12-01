import { NextFunction, Request, Response } from 'express';
import * as categoryService from '@/services/categoryService';

export const getCategoryList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryList = await categoryService.getCategoryList(req.userId);
    res.send(categoryList);
  } catch (err) {
    next(err);
  }
};
export const subscribeCategory = async (
  req: Request<Record<string, never>, Record<string, never>, { categoryId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryService.subscribeCategory(req.userId, req.body.categoryId);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
export const subscribeCategories = async (
  req: Request<Record<string, never>, Record<string, never>,
    { removeCatIds: number[], newCatIds: number[] }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryService.subscribeCategories(
      req.userId,
      req.body.removeCatIds,
      req.body.newCatIds,
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryList = await categoryService.getAllCategories();
    res.send(categoryList);
  } catch (err) {
    next(err);
  }
};

export const categoryByProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryList = await categoryService.getAllCategories();
    const list = categoryList.data;
    const result: Record<string, Array<{ categoryId: number, categoryName: string }>> = {};
    list.forEach((category) => {
      if (result[category.provider]) {
        result[category.provider].push({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
        });
      } else {
        result[category.provider] = [{
          categoryId: category.categoryId,
          categoryName: category.categoryName,
        }];
      }
    });
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};
