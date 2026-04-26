// SPDX-License-Identifier: BSD-3-Clause
// Copyright (c) 2026, Kumarjit Das. All rights reserved.

import { createContext, useContext } from "react";
import type { KdGroupContextValue } from "./types";

export const KdResizableGroupContext = createContext<KdGroupContextValue | null>(
  null,
);

export function useKdResizableGroup(): KdGroupContextValue {
  const ctx = useContext(KdResizableGroupContext);
  if (!ctx) throw new Error("Must be used inside KdResizablePanelGroup");
  return ctx;
}
