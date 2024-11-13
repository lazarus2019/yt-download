import { VideoQueryParams } from './types';

export const youtubeQueryKeys = {
  list: ['youtube', 'query'],
  query: (params: VideoQueryParams) => [...youtubeQueryKeys.list, params],
} as const;

export const youtubeToMP3QueryKeys = {
  list: ['youtube', 'toMP3'],
  query: (videoId: string) => [...youtubeToMP3QueryKeys.list, videoId],
};

export const youtubeSuggestionKeys = {
  list: ['youtube', 'suggestion'],
  query: (keyword: string) => [...youtubeSuggestionKeys.list, keyword],
};
