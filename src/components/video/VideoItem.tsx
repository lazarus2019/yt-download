import { VideoQueryItemRes } from '@/services/youtube/types';

import classNames from './video.module.scss';

interface VideoItemProps {
  video: VideoQueryItemRes;
  setVideoId: (videoId: string) => void;
}

export const VideoItem = ({ video, setVideoId }: VideoItemProps) => {
  const { snippet } = video;

  const handleClick = () => {
    setVideoId(video.id.videoId);
  };

  return (
    <div className={classNames['video-item']}>
      <div>
        <img
          className={classNames['thumbnail']}
          src={snippet.thumbnails.high.url}
          alt={snippet.title}
        />
        <p className={classNames['title']}>{snippet.title}</p>
      </div>

      <button className={classNames['download-btn']} onClick={handleClick}>
        Icon Download video
      </button>
    </div>
  );
};
