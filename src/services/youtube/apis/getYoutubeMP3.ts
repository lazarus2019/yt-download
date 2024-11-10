import { axiosYoutubeToMP3 } from '@/apis/axios';
import { youtubeToMP3QueryKeys } from '../queryKeys';
import { DownloadMP3VideoRes } from '../types';

const getYoutubeMP3 = async (videoId: string) => {
  const data = await axiosYoutubeToMP3.get<DownloadMP3VideoRes>('', {
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
