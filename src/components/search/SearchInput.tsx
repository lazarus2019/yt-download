import { KeyboardEvent, useState } from 'react';

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  label: string;
  onSubmit: (value: string) => void;
}

export const SearchInput = ({
  label,
  onSubmit,
  defaultValue = '',
  placeholder = 'Enter value',
}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSubmit(value);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={handleOnChange}
        onKeyUp={handleEnter}
        placeholder={placeholder}
      />
    </div>
  );
};
