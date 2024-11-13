import { useState } from 'react';

import classNames from './search.module.scss';

interface SuggestionListProps {
  suggestions: string[];
  onClick: (value: string) => void;
}

export const SuggestionList = ({
  suggestions,
  onClick,
}: SuggestionListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={classNames['suggestion-list']}>
      {suggestions.map((suggestion, index) => (
        <button onClick={() => onClick(suggestion)}>{suggestion}</button>
      ))}
    </div>
  );
};
