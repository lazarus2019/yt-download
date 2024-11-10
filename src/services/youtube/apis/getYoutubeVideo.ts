import { axiosGGYoutubeQuery } from '@/apis/axios';
import { youtubeQueryKeys } from '../queryKeys';
import { VideoQueryParams, VideoQueryRes } from '../types';

const getGGYoutubeVideo = async ({
  q,
  part = 'snippet',
  maxResults = 48, // maximum is 50
  regionCode = 'VN',
  type = 'video',
}: VideoQueryParams) => {
  const data = await axiosGGYoutubeQuery.get<VideoQueryRes>('', {
    params: {
      q,
      part,
      maxResults,
      regionCode,
      type,
    },
  });

  return data.data;
};

export const getGGYoutubeVideoQuery = (params: VideoQueryParams) => {
  return {
    queryKey: youtubeQueryKeys.query(params),
    queryFn: () => getGGYoutubeVideo(params),
  };
};
