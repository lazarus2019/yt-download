import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

type StoreContextType = {
  videoId: string;
  setVideoId: (videoId: string) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [videoId, setVideoId] = useState<string>('');

  const value = useMemo(
    () => ({
      videoId,
      setVideoId,
    }),
    [videoId]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
