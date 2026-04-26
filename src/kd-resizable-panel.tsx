// SPDX-License-Identifier: BSD-3-Clause
// Copyright (c) 2026, Kumarjit Das. All rights reserved.

import { useKdResizableGroup } from "./context";
import type { KdResizablePanelProps } from "./types";

export function KdResizablePanel({
  className,
  style,
  children,
  _panelIndex,
  // Consumed by KdResizablePanelGroup via child.props — not used by the panel itself.
  defaultSize: _defaultSize,
  minSize: _minSize,
  maxSize: _maxSize,
}: KdResizablePanelProps) {
  const { sizes } = useKdResizableGroup();
  const size = _panelIndex !== undefined ? sizes[_panelIndex] : undefined;

  return (
    <div
      className={`kd-resizable-panel${className ? ` ${className}` : ""}`}
      style={{
        flexBasis: size !== undefined ? `${size}%` : undefined,
        flexShrink: 0,
        flexGrow: size !== undefined ? 0 : 1,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
