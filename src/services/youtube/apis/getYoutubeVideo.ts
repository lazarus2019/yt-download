import { axiosGGYoutubeQuery } from '@/apis/axios';
import { VideoQueryParams, VideoQueryRes } from '../types';
import { Response } from '@/types/common';

const getGGYoutubeVideo = async ({
  part = 'snippet',
  q,
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

  console.log(data);
  return data.data;
};

export const getGGYoutubeVideoQuery = (params: VideoQueryParams) => {
  return {
    queryKey: [],
    queryFn: () => getGGYoutubeVideo(params),
  };
};
