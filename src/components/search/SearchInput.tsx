import { KeyboardEvent, useState } from 'react';

import classNames from './search.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getYoutubeSuggestionQuery } from '@/services/youtube/apis/getYoutubeSuggestion';
import clsx from 'clsx';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
}

export const SearchInput = ({
  onSubmit,
  defaultValue = '',
  placeholder = 'Enter value',
}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const submitValue = useDebounce(value);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [enableSubmit, setEnableSubmit] = useState(false);

  const { data: suggestionData } = useQuery({
    ...getYoutubeSuggestionQuery(submitValue),
    enabled: !!submitValue && enableSubmit,
  });

  const handleSubmit = () => {
    if (!submitValue || submitValue.trim() === '') return;

    onSubmit(submitValue);
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
      setEnableSubmit(true);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setEnableSubmit(true);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex(
        (prevIndex) => (prevIndex + 1) % (suggestionData?.length ?? 0)
      );
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex(
        (prevIndex) =>
          (prevIndex - 1 + (suggestionData?.length ?? 0)) %
          (suggestionData?.length ?? 0)
      );
    }
  };

  return (
    <div className={classNames['search-input-container']}>
      <div className={classNames['search-input-wrapper']}>
        <input
          className={classNames['search-input']}
          value={value}
          onChange={handleOnChange}
          onKeyUp={handleEnter}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className={classNames['search-btn']} onClick={handleSubmit}>
        Search
      </button>

      <div className={classNames['suggestion-list']}>
        {suggestionData &&
          suggestionData.map((suggestion, index) => (
            <button
              key={`suggestion-item-${index}`}
              className={clsx(classNames['suggestion-item'], {
                [classNames['active']]: index === selectedIndex,
              })}
              onClick={() => {
                setValue(suggestion);
                setEnableSubmit(false);
              }}
            >
              {suggestion}
            </button>
          ))}
      </div>
    </div>
  );
};
