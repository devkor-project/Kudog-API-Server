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
