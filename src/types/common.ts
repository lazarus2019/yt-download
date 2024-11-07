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
