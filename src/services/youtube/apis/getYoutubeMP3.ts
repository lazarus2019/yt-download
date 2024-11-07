import { axiosYoutubeToMP3 } from '@/apis/axios';
import { Response } from '@/types/common';
import { DownloadMP3VideoRes } from '../types';
import { youtubeToMP3QueryKeys } from '../queryKeys';

const getYoutubeMP3 = async (videoId: string) => {
  const data = await axiosYoutubeToMP3.get<Response<DownloadMP3VideoRes>>('', {
    params: {
      id: videoId,
    },
  });

  return data.data;
};

export const getYoutubeMP3Query = (videoId: string) => {
  return {
    queryKey: youtubeToMP3QueryKeys.query(videoId),
    queryFn: () => getYoutubeMP3(videoId),
  };
};
