import { createContext }  from 'react';
import { RootStore } from '../store';

export const storeContext = createContext<RootStore | null>(null);