import { KeyboardEvent, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { getYoutubeSuggestionQuery } from '@/services/youtube/apis/getYoutubeSuggestion';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import classNames from './search.module.scss';

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
  const submitValue = useDebounce(value, 500);
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
    if (event.key !== 'Enter') return;

    if (selectedIndex === -1) {
      if (!submitValue || submitValue.trim() === '') return;

      onSubmit(submitValue);
    } else {
      if (!suggestionData || suggestionData.length === 0) return;

      setValue(suggestionData[selectedIndex]);
      setEnableSubmit(false);
      setSelectedIndex(-1);
      onSubmit(suggestionData[selectedIndex]);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setEnableSubmit(true);
    setSelectedIndex(-1);
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
    // else if (event.key === 'Enter') {
    //   if (!suggestionData || suggestionData.length === 0) return;

    //   setValue(suggestionData[selectedIndex]);
    //   setEnableSubmit(false);
    //   setSelectedIndex(-1);
    // }
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
        {suggestionData
          ? suggestionData.map((suggestion, index) => (
              <button
                key={`suggestion-item-${index}`}
                className={clsx(classNames['suggestion-item'], {
                  [classNames['active']]: index === selectedIndex,
                })}
                onClick={() => {
                  setValue(suggestion);
                  setEnableSubmit(false);
                  onSubmit(suggestion);
                }}
              >
                {suggestion}
              </button>
            ))
          : null}
      </div>
    </div>
  );
};
