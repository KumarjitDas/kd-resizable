// SPDX-License-Identifier: BSD-3-Clause
// Copyright (c) 2026, Kumarjit Das. All rights reserved.

import "./kd-resizable.css";

export { KdResizablePanelGroup } from "./kd-resizable-panel-group";
export { KdResizablePanel } from "./kd-resizable-panel";
export { KdResizableHandle } from "./kd-resizable-handle";
export type {
  KdDirection,
  KdResizablePanelGroupProps,
  KdResizablePanelProps,
  KdResizableHandleProps,
} from "./types";

// Aliases for backward compatibility
export { KdResizablePanelGroup as ResizablePanelGroup } from "./kd-resizable-panel-group";
export { KdResizablePanel as ResizablePanel } from "./kd-resizable-panel";
export { KdResizableHandle as ResizableHandle } from "./kd-resizable-handle";
export type {
  KdDirection as Direction,
  KdResizablePanelGroupProps as ResizablePanelGroupProps,
  KdResizablePanelProps as ResizablePanelProps,
  KdResizableHandleProps as ResizableHandleProps,
} from "./types";
