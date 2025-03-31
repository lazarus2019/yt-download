import { useState } from 'react';
import { SearchInput } from './components/search/SearchInput';

import { useQuery } from '@tanstack/react-query';
import classNames from './app.module.scss';
import { ConvertSection } from './components/convert/ConvertSection';
import { VideoList } from './components/video/VideoList';
import { getGGYoutubeVideoQuery } from './services/youtube/apis/getYoutubeVideo';

console.log(import.meta.env.VITE_SAMPLE_YOUTUBE_URL);

function App() {
  const [keyword, setKeyword] = useState('');

  const { data } = useQuery({
    ...getGGYoutubeVideoQuery({ q: keyword }),
    enabled: !!keyword,
  });

  return (
    <div className={classNames['app']}>
      <h1 className={classNames['title']}>
        Y2Download - Youtube Downloader w/t ads
      </h1>
      <div className={classNames['search-input-container']}>
        <SearchInput defaultValue={keyword} onSubmit={setKeyword} />
      </div>

      <div className={classNames['video-list-container']}>
        <VideoList videos={data?.items ?? []} />
      </div>

      <ConvertSection />
    </div>
  );
}

export default App;
