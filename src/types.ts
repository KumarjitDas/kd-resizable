import type { CSSProperties, ReactNode, RefObject } from 'react';

export type Direction = 'horizontal' | 'vertical';

export interface PanelConfig {
  minSize: number;
  maxSize: number;
}

export interface GroupContextValue {
  direction: Direction;
  sizes: number[];
  panelConfigs: PanelConfig[];
  containerRef: RefObject<HTMLDivElement | null>;
  onHandleDragStart: (handleIndex: number, clientPos: number) => void;
  onHandleDrag: (clientPos: number) => void;
  onHandleDragEnd: () => void;
  resizePanels: (handleIndex: number, deltaPercent: number) => void;
}

export interface ResizablePanelGroupProps {
  direction?: Direction;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onLayout?: (sizes: number[]) => void;
}

export interface ResizablePanelProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** @internal injected by ResizablePanelGroup */
  _panelIndex?: number;
}

export interface ResizableHandleProps {
  withHandle?: boolean;
  className?: string;
  style?: CSSProperties;
  /** @internal injected by ResizablePanelGroup */
  _handleIndex?: number;
}
