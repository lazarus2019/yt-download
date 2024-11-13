import { axiosYoutubeCustom } from '@/apis/axios';
import { youtubeSuggestionKeys } from '../queryKeys';

const getYoutubeSuggestion = async (keyword: string) => {
  const data = await axiosYoutubeCustom.get<string[]>('/search-yt', {
    params: {
      q: keyword,
    },
  });

  return data.data;
};

export const getYoutubeSuggestionQuery = (keyword: string) => {
  return {
    queryKey: youtubeSuggestionKeys.query(keyword),
    queryFn: () => getYoutubeSuggestion(keyword),
  };
};
