import { fileTypes } from '@/configs/common';

export type Response<Data> = {
  data: Data;
  status: number;
};

export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export type VideoQueryThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type FileType = (typeof fileTypes)[keyof typeof fileTypes];

export type ConvertData = {
  fileType: string;
  url: string;
  quality: string;
};
