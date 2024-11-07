import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './App.css';
import { SearchInput } from './components/search/SearchInput';
import { convertFileSize, convertSecondsToMinutes } from './helpers/common';
import { getYoutubeMP3Query } from './services/youtube/apis/getYoutubeMP3';
import { getGGYoutubeVideoQuery } from './services/youtube/apis/getYoutubeVideo';

function App() {
  const [keyword, setKeyword] = useState('');

  const [activeDownload, setActiveDownload] = useState(false);
  const { data } = useQuery({
    ...getGGYoutubeVideoQuery({ q: keyword, regionCode: 'US' }),
    enabled: !!keyword,
  });

  const { data: downloadData } = useQuery({
    ...getYoutubeMP3Query('Tc0tLGWIqxA'),
    enabled: activeDownload,
  });

  console.log(data, downloadData);

  console.log(
    convertFileSize(3594994),
    convertSecondsToMinutes(215.66693938098)
  );

  return (
    <div>
      <SearchInput
        label="Search video"
        defaultValue={keyword}
        onSubmit={setKeyword}
      />
      <button onClick={() => setActiveDownload((prev) => !prev)}>
        Download
      </button>
    </div>
  );
}

export default App;
