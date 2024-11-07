import { axiosGGYoutubeQuery } from '@/apis/axios';
import { VideoQueryParams, VideoQueryRes } from '../types';
import { Response } from '@/types/common';
import { youtubeQueryKeys } from '../queryKeys';

const getGGYoutubeVideo = async ({
  q,
  part = 'snippet',
  maxResults = 10,
  regionCode = 'VN',
  type = 'video',
}: VideoQueryParams) => {
  const data = await axiosGGYoutubeQuery.get<Response<VideoQueryRes>>('', {
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
