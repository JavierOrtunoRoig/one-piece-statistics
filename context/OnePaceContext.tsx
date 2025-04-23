'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';
import { onePaceReducer, Action } from '@/helpers/reducer';
import { mergeJsons } from '@/helpers/json';
import latestJson from '@/assets/one_pace.json';

const lastOnePace = latestJson as Serie;

const getFinalJson = (): Serie => {
  if (typeof window === 'undefined') {
    return lastOnePace;
  }

  let merge = lastOnePace;
  if (typeof window !== 'undefined' && localStorage.getItem('one_pace')) {
    const existingInfo = JSON.parse(localStorage.getItem('one_pace') as string);
    merge = mergeJsons(lastOnePace, existingInfo);
  }
  localStorage.setItem('one_pace', JSON.stringify(merge));
  return merge;
};

// Tipo del contexto
type OnePaceContextType = {
  state: Serie;
  dispatch: Dispatch<Action>;
};

// Crear el contexto
const OnePaceContext = createContext<OnePaceContextType | undefined>(undefined);

// Provider
export const OnePaceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(onePaceReducer, null, () =>
    getFinalJson(),
  );

  return (
    <OnePaceContext.Provider value={{ state, dispatch }}>
      {children}
    </OnePaceContext.Provider>
  );
};

// Hook personalizado para usarlo en cualquier componente
export const useOnePace = (): OnePaceContextType => {
  const context = useContext(OnePaceContext);
  if (!context)
    throw new Error('useOnePace must be used within OnePaceProvider');
  return context;
};
