// SPDX-License-Identifier: BSD-3-Clause
// Copyright (c) 2026, Kumarjit Das. All rights reserved.

import type { CSSProperties, ReactNode, RefObject } from 'react';

export type KdDirection = 'horizontal' | 'vertical';

export interface KdPanelConfig {
  minSize: number;
  maxSize: number;
}

export interface KdGroupContextValue {
  direction: KdDirection;
  sizes: number[];
  panelConfigs: KdPanelConfig[];
  containerRef: RefObject<HTMLDivElement | null>;
  onHandleDragStart: (handleIndex: number, clientPos: number) => void;
  onHandleDrag: (clientPos: number) => void;
  onHandleDragEnd: () => void;
  resizePanels: (handleIndex: number, deltaPercent: number) => void;
}

export interface KdResizablePanelGroupProps {
  direction?: KdDirection;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onLayout?: (sizes: number[]) => void;
}

export interface KdResizablePanelProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** @internal injected by KdResizablePanelGroup */
  _panelIndex?: number;
}

export interface KdResizableHandleProps {
  withHandle?: boolean;
  className?: string;
  style?: CSSProperties;
  /** @internal injected by KdResizablePanelGroup */
  _handleIndex?: number;
}
