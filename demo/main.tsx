// SPDX-License-Identifier: BSD-3-Clause
// Copyright (c) 2026, Kumarjit Das. All rights reserved.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
