import { useResizableGroup } from "./context";
import type { ResizablePanelProps } from "./types";

export function ResizablePanel({
  className,
  style,
  children,
  _panelIndex,
  defaultSize: _defaultSize,
  minSize: _minSize,
  maxSize: _maxSize,
}: ResizablePanelProps) {
  const { sizes } = useResizableGroup();
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
