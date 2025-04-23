'use client';

import { OnePaceProvider } from '@/context/OnePaceContext';
import { Arcs } from './Arcs';

export const ArcsWrapper = () => (
  <OnePaceProvider>
    <Arcs />
  </OnePaceProvider>
);
