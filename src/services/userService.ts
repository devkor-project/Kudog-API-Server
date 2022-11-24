import logger from '@/config/winston';
import User from '@/entities/User';
import ServiceResult from '@/interfaces/common';
import { EMAIL_NOT_EXISTS } from '@/interfaces/error';
import { userInfoDto } from '@/interfaces/userDto';

export const getUserInfo = async (userId: number):
  Promise<ServiceResult<userInfoDto>> => {
  const user = await User.findOne({ where: { userId } });
  if (!user) {
    throw EMAIL_NOT_EXISTS;
  }

  const userInfo: userInfoDto = {
    email: user.email,
    receiveEmail: user.receiveEmail,
    studentID: user.studentID,
    grade: user.grade,
    major: user.major,
  };

  logger.info('get user information success', userId, userInfo);
  return { data: userInfo };
};

export const modifyUserInfo = async (userId: number, modifiedInfo: userInfoDto):
  Promise<ServiceResult<userInfoDto>> => {
  const {
    email, receiveEmail, studentID, grade, major,
  } = modifiedInfo;
  const user = await User.findOne({ where: { userId } });
  if (!user) {
    throw EMAIL_NOT_EXISTS;
  }
  user.email = email;
  user.receiveEmail = receiveEmail;
  user.studentID = studentID;
  user.grade = grade;
  user.major = major;
  await user.save();
  const userInfo: userInfoDto = {
    email: user.email,
    receiveEmail: user.receiveEmail,
    studentID: user.studentID,
    grade: user.grade,
    major: user.major,
  };

  logger.info('modify user information success', userId, userInfo);
  return { data: userInfo };
};
