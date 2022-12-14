export interface noticeDto {
  noticeId: number;
  title: string;
  content: string;
  writer: string;
  date: string;
  url: string;
  provider: string;
  viewCount: number;
  categoryName: string;
  isScraped: string;
}

export interface simpleNoticeDto {
  noticeId: number;
  title: string;
  date: string;
  provider: string;
  viewCount: number;
  categoryName: string;
  isScraped: string;
}

export interface getNoticesDto {
  userId: number;
  categoryId: number;
}

export interface searchNoticesDto {
  userId: number;
  keyword: string;
  categoryName: string;
  provider: string;
}
