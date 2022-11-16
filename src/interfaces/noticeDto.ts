export interface noticeDto {
  noticeId: number;
  title: string;
  content: string;
  writer: string;
  date: string;
  url: string;
  provider: string;
  viewCount: number;
  category: { categoryName: string };
}
