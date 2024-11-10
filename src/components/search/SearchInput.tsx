import { KeyboardEvent, useState } from 'react';

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

  const handleSubmit = () => {
    if (!value || value.trim() === '') return;

    onSubmit(value);
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
        />
      </div>
      <button className={classNames['search-btn']} onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};
