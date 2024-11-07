import { useState } from 'react';
import './App.css';
import { SearchInput } from './components/search/SearchInput';
import { useQuery } from '@tanstack/react-query';
import { getGGYoutubeVideoQuery } from './services/youtube/apis/getYoutubeVideo';

function App() {
  const [keyword, setKeyword] = useState('');

  const { data } = useQuery({
    ...getGGYoutubeVideoQuery({ q: keyword, regionCode: 'US' }),
    enabled: !!keyword,
  });

  console.log(data);

  return (
    <div>
      <SearchInput
        label="Search video"
        defaultValue={keyword}
        onSubmit={setKeyword}
      />
    </div>
  );
}

export default App;
