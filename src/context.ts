import { createContext, useContext } from 'react';
import type { GroupContextValue } from './types';

export const ResizableGroupContext = createContext<GroupContextValue | null>(null);

export function useResizableGroup(): GroupContextValue {
  const ctx = useContext(ResizableGroupContext);
  if (!ctx) throw new Error('Must be used inside ResizablePanelGroup');
  return ctx;
}
