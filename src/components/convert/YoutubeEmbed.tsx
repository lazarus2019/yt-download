import { YOUTUBE_EMBED_URL } from '@/configs/common';

interface YoutubeEmbedProps {
  videoId: string;
  title?: string;
}

export const YoutubeEmbed = ({
  videoId,
  title = 'Video title',
}: YoutubeEmbedProps) => {
  return (
    <div>
      <iframe
        width={320}
        height={240}
        src={`${YOUTUBE_EMBED_URL}${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title={title}
      />
    </div>
  );
};
