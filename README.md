# kd-resizable

[![npm version](https://img.shields.io/npm/v/kd-resizable)](https://www.npmjs.com/package/@kumarjitdas/kd-resizable)
[![bundle size](https://img.shields.io/bundlephobia/minzip/kd-resizable)](https://bundlephobia.com/package/@kumarjitdas/kd-resizable)
[![license](https://img.shields.io/npm/l/kd-resizable)](./LICENSE.txt)

Lightweight, accessible React resizable panel component — zero runtime dependencies beyond React.

**[Website](https://github.com/KumarjitDas/kd-resizable) · [Live Demo](https://kumarjitdas.github.io/kd-resizable) · [npm](https://www.npmjs.com/package/@kumarjitdas/kd-resizable)**

---

## Features

- Horizontal & vertical splits
- Nestable groups (e.g. IDE-style three-pane layout)
- `minSize` / `maxSize` constraints per panel — sizes always sum to 100 %
- Keyboard accessible — arrow keys resize, correct ARIA roles (`separator`)
- Dark mode via CSS custom properties, no extra setup
- ~8 kB minified · ~3 kB gzipped · zero runtime dependencies

## Installation

```sh
npm install kd-resizable
# or
pnpm add kd-resizable
```

## Usage

Import the components and the stylesheet:

```tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "kd-resizable";
import "kd-resizable/style.css";

function App() {
  return (
    <ResizablePanelGroup direction="horizontal" style={{ height: "100vh" }}>
      <ResizablePanel defaultSize={25} minSize={10}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <MainContent />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### Nested groups

```tsx
<ResizablePanelGroup direction="horizontal" style={{ height: "100vh" }}>
  <ResizablePanel defaultSize={20} minSize={10}>
    <Explorer />
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={80}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={70}>
        <Editor />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30} minSize={10}>
        <Terminal />
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>
```

## API

### `ResizablePanelGroup`

| Prop        | Type                         | Default        | Description                                            |
| ----------- | ---------------------------- | -------------- | ------------------------------------------------------ |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Split axis                                             |
| `onLayout`  | `(sizes: number[]) => void`  | —              | Fires on every resize with the current panel sizes (%) |
| `className` | `string`                     | —              | Added to the container `<div>`                         |
| `style`     | `CSSProperties`              | —              | Inline style on the container `<div>`                  |

### `ResizablePanel`

| Prop          | Type            | Default            | Description                       |
| ------------- | --------------- | ------------------ | --------------------------------- |
| `defaultSize` | `number`        | evenly distributed | Initial size in `%`               |
| `minSize`     | `number`        | `0`                | Minimum size in `%`               |
| `maxSize`     | `number`        | `100`              | Maximum size in `%`               |
| `className`   | `string`        | —                  | Added to the panel `<div>`        |
| `style`       | `CSSProperties` | —                  | Inline style on the panel `<div>` |

### `ResizableHandle`

| Prop         | Type            | Default | Description                                      |
| ------------ | --------------- | ------- | ------------------------------------------------ |
| `withHandle` | `boolean`       | `false` | Show the grip badge in the centre of the divider |
| `className`  | `string`        | —       | Added to the handle `<div>`                      |
| `style`      | `CSSProperties` | —       | Inline style on the handle `<div>`               |

## Keyboard support

Focus any handle (Tab), then use:

| Key       | Action                    |
| --------- | ------------------------- |
| `←` / `→` | Resize (horizontal group) |
| `↑` / `↓` | Resize (vertical group)   |

Each key press moves the split by 1 %, clamped by `minSize` / `maxSize`.

## Theming

All visual properties are CSS custom properties. Set them on `.kd-resizable-handle`
or any ancestor to scope overrides:

```css
.kd-resizable-handle {
  --kd-handle-size: 1px; /* divider thickness */
  --kd-handle-bg: #e2e8f0;
  --kd-handle-hover-bg: #94a3b8;
  --kd-focus-ring: #3b82f6;
  --kd-grip-bg: #fff;
  --kd-grip-border: #e2e8f0;
  --kd-grip-color: #94a3b8;
  --kd-grip-hover-border: #94a3b8;
  --kd-grip-hover-color: #475569;
}
```

Dark mode overrides are included by default via `@media (prefers-color-scheme: dark)`.

## Browser support

All browsers that support the [Pointer Events API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) (Chrome 55+, Firefox 59+, Safari 13+, Edge 79+).

## License

BSD-3-Clause © [Kumarjit Das](https://github.com/KumarjitDas)
