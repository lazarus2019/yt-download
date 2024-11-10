import { useQuery } from '@tanstack/react-query';
import { ConvertTab } from './ConvertTab';
import { YoutubeEmbed } from './YoutubeEmbed';

import classNames from './convert.module.scss';
import { getYoutubeMP3Query } from '@/services/youtube/apis/getYoutubeMP3';
import { useStoreContext } from '@/providers/StoreProvider';
import { useState } from 'react';
import { ConvertData } from '@/types/common';
import { mockDownloadMP3 } from '@/configs/mockData';
import clsx from 'clsx';

export const ConvertSection = () => {
  const [shouldConvert, setShouldConvert] = useState(false);
  const { videoId, setVideoId } = useStoreContext();

  const {
    data: downloadData,
    isFetching,
    isPending,
    isError,
  } = useQuery({
    ...getYoutubeMP3Query(videoId),
    enabled: !!videoId && shouldConvert,
    select: (data): ConvertData => {
      return {
        fileType: 'audio',
        url: data.link,
        quality: '256',
      };
    },
  });

  const handleClose = () => {
    setVideoId('');
    setShouldConvert(false);
  };

  const handleClickConvert = () => {
    if (!videoId) return;
    setShouldConvert(true);
  };

  const showBackDrop = isError || isFetching || isPending || !downloadData;

  return (
    <div
      className={clsx(classNames['overlay'], {
        [classNames['active']]: !!videoId,
      })}
    >
      <div className={classNames['convert-container']}>
        <section className={classNames['convert-section']}>
          <div>
            <YoutubeEmbed videoId={videoId} />
            {!downloadData && (
              <button
                className={classNames['convert-btn']}
                onClick={handleClickConvert}
              >
                {isError ? 'Convert again' : 'Convert video'}
              </button>
            )}
          </div>

          <div className={classNames['convert-tab']}>
            <div
              className={clsx(classNames['convert-tab-backdrop'], {
                [classNames['active']]: showBackDrop && !shouldConvert,
              })}
            />
            <ConvertTab
              data={downloadData ? [downloadData] : mockDownloadMP3}
            />
          </div>
        </section>

        <button className={classNames['close-btn']} onClick={handleClose}>
          Close
        </button>

        <button className={classNames['close-popup-btn']} onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
};
