import { PageInfo, VideoQueryThumbnail } from '@/types/common';

// Explore more: https://developers.google.com/youtube/v3/docs/search/list
export type VideoQueryParams = {
  q: string; // search query
  part?: string; // snippet,...
  type?: string; // video, channel, playlist
  maxResults?: number;
  regionCode?: string; // ex: US, VN, KR, ... reference: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes
};

export type DownloadMP3VideoRes = {
  link: string;
  title: string;
  duration: number;
  status: string;
  msg: string;
};

export type VideoQueryItemRes = {
  id: {
    videoId: string;
    channelId: string;
    kind: string;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    thumbnails: {
      default: VideoQueryThumbnail;
      medium: VideoQueryThumbnail;
      high: VideoQueryThumbnail;
    };
  };
};

export type VideoQueryRes = {
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: VideoQueryItemRes[];
};
