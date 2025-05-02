// context/SerieContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';
import { onePaceReducer, Action } from '@/helpers/reducer';
import { mergeJsons } from '@/helpers/json';

type SerieContextType = {
  state: Serie;
  dispatch: Dispatch<Action>;
};

type SerieKey = 'one_piece' | 'one_pace';

const SerieContext = createContext<SerieContextType | undefined>(undefined);

export const SerieProvider = ({
  children,
  serieKey,
  defaultData,
}: {
  children: ReactNode;
  serieKey: SerieKey;
  defaultData: Serie;
}) => {
  const getInitialData = (): Serie => {
    if (typeof window === 'undefined') return defaultData;

    let stored = defaultData;

    try {
      const storedJson = localStorage.getItem(serieKey);
      if (storedJson) {
        const parsed = JSON.parse(storedJson);
        stored = mergeJsons(defaultData, parsed);
      }
    } catch {
      console.warn(
        `[SerieProvider] Invalid JSON for "${serieKey}" in localStorage. Resetting...`,
      );
      localStorage.removeItem(serieKey);
    }

    localStorage.setItem(serieKey, JSON.stringify(stored));
    return stored;
  };

  const [state, dispatch] = useReducer(onePaceReducer, null, () =>
    getInitialData(),
  );

  useEffect(() => {
    if (state) {
      localStorage.setItem(serieKey, JSON.stringify(state));
    }
  }, [state, serieKey]);

  return (
    <SerieContext.Provider value={{ state, dispatch }}>
      {children}
    </SerieContext.Provider>
  );
};

export const useSerieProgress = () => {
  const context = useContext(SerieContext);
  if (!context)
    throw new Error('useSerieProgress must be used within SerieProvider');
  return context;
};
