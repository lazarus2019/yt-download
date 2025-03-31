import classNames from './search.module.scss';

interface SuggestionListProps {
  suggestions: string[];
  onClick: (value: string) => void;
}

export const SuggestionList = ({
  suggestions,
  onClick,
}: SuggestionListProps) => {
  return (
    <div className={classNames['suggestion-list']}>
      {suggestions.map((suggestion) => (
        <button
          className={classNames['suggestion-item']}
          onClick={() => onClick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};
