import { VideoQueryItemRes } from '@/services/youtube/types';
import { VideoItem } from './VideoItem';

import classNames from './video.module.scss';
import { useStoreContext } from '@/providers/StoreProvider';

interface VideoListProps {
  videos: VideoQueryItemRes[];
}

export const VideoList = ({ videos }: VideoListProps) => {
  const { setVideoId } = useStoreContext();

  return (
    <>
      <div className={classNames['video-list']}>
        {videos.map((video) => (
          <VideoItem
            key={video.id.videoId}
            video={video}
            setVideoId={setVideoId}
          />
        ))}
      </div>
      {videos.length === 0 && (
        <div className={classNames['no-video']}>No video found</div>
      )}
    </>
  );
};
