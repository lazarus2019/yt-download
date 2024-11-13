import { useState } from 'react';
import { SearchInput } from './components/search/SearchInput';

import classNames from './app.module.scss';
import { ConvertSection } from './components/convert/ConvertSection';

function App() {
  const [keyword, setKeyword] = useState('');

  // const { data } = useQuery({
  //   ...getGGYoutubeVideoQuery({ q: keyword }),
  //   enabled: !!keyword,
  // });

  // useEffect(() => {
  //   if (keyword === '') return;

  //   axios.get('http://localhost:4000/search-yt', {
  //     params: {
  //       q: keyword,
  //     },
  //   });
  // }, [keyword]);

  return (
    <div className={classNames['app']}>
      <h1 className={classNames['title']}>
        Y2Download - Youtube Downloader w/t ads
      </h1>
      <div className={classNames['search-input-container']}>
        <SearchInput defaultValue={keyword} onSubmit={setKeyword} />
      </div>

      <div className={classNames['video-list-container']}>
        {/* <VideoList videos={data?.items ?? []} /> */}
      </div>

      <ConvertSection />
    </div>
  );
}

export default App;
