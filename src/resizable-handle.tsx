// SPDX-License-Identifier: BSD-3-Clause
// Copyright (c) 2026, Kumarjit Das. All rights reserved.

import { useState, useCallback } from "react";
import { useResizableGroup } from "./context";
import type { ResizableHandleProps } from "./types";

export function ResizableHandle({
  withHandle = false,
  className,
  style,
  _handleIndex,
}: ResizableHandleProps) {
  const {
    direction,
    sizes,
    panelConfigs,
    onHandleDragStart,
    onHandleDrag,
    onHandleDragEnd,
    resizePanels,
  } = useResizableGroup();

  const [isDragging, setIsDragging] = useState(false);

  const i = _handleIndex ?? -1;
  const panelSizeBefore = sizes[i] ?? 0;
  const configBefore = panelConfigs[i];

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (_handleIndex === undefined) return;
      e.preventDefault();
      setIsDragging(true);
      onHandleDragStart(
        _handleIndex,
        direction === "horizontal" ? e.clientX : e.clientY,
      );

      const onMove = (ev: PointerEvent) => {
        onHandleDrag(direction === "horizontal" ? ev.clientX : ev.clientY);
      };
      const onUp = () => {
        setIsDragging(false);
        onHandleDragEnd();
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };
      // Document-level so drag continues even when the cursor leaves the handle element.
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [_handleIndex, direction, onHandleDragStart, onHandleDrag, onHandleDragEnd],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (_handleIndex === undefined) return;
      const forward = direction === "horizontal" ? "ArrowRight" : "ArrowDown";
      const backward = direction === "horizontal" ? "ArrowLeft" : "ArrowUp";
      if (e.key === forward) {
        e.preventDefault();
        resizePanels(_handleIndex, 1);
      }
      if (e.key === backward) {
        e.preventDefault();
        resizePanels(_handleIndex, -1);
      }
    },
    [_handleIndex, direction, resizePanels],
  );

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={direction === "horizontal" ? "vertical" : "horizontal"}
      aria-valuenow={Math.round(panelSizeBefore)}
      aria-valuemin={configBefore?.minSize ?? 0}
      aria-valuemax={configBefore?.maxSize ?? 100}
      data-direction={direction}
      data-dragging={isDragging || undefined}
      className={`kd-resizable-handle${className ? ` ${className}` : ""}`}
      style={style}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
    >
      {withHandle && (
        <div
          className="kd-resizable-handle__grip"
          style={{
            width: direction === "horizontal" ? "5px" : "25px",
            height: direction === "horizontal" ? "25px" : "5px",
          }}
        />
      )}
    </div>
  );
}
