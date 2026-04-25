import {
  useState,
  useRef,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
  type ReactElement,
} from "react";
import { ResizableGroupContext } from "./context";
import { ResizablePanel } from "./resizable-panel";
import { ResizableHandle } from "./resizable-handle";
import type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
  GroupContextValue,
  PanelConfig,
} from "./types";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className,
  style,
  children,
  onLayout,
}: ResizablePanelGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive panel metadata from children at render time
  const childArray = Children.toArray(children) as ReactElement[];
  const panelElements = childArray.filter(
    (child) => isValidElement(child) && child.type === ResizablePanel,
  );

  const panelConfigs: PanelConfig[] = panelElements.map((child) => ({
    minSize: (child.props as ResizablePanelProps).minSize ?? 0,
    maxSize: (child.props as ResizablePanelProps).maxSize ?? 100,
  }));

  // Always-current ref so callbacks never capture stale config
  const panelConfigsRef = useRef(panelConfigs);
  panelConfigsRef.current = panelConfigs;

  const [sizes, setSizes] = useState<number[]>(() =>
    panelElements.length === 0
      ? []
      : panelElements.map(
          (child) =>
            (child.props as ResizablePanelProps).defaultSize ??
            100 / panelElements.length,
        ),
  );

  const sizesRef = useRef(sizes);
  sizesRef.current = sizes;

  const dragRef = useRef<{
    handleIndex: number;
    startPos: number;
    startSizes: number[];
  } | null>(null);

  // Core resize: apply a percentage delta through handle `handleIndex`,
  // respecting each adjacent panel's min/max. Sizes always sum to 100.
  const applyDelta = useCallback(
    (handleIndex: number, delta: number, from: number[]) => {
      const configs = panelConfigsRef.current;
      const i = handleIndex;
      const j = handleIndex + 1;
      if (i >= from.length || j >= from.length) return;

      const actual = clamp(
        delta,
        -Math.min(from[i] - configs[i].minSize, configs[j].maxSize - from[j]),
        Math.min(configs[i].maxSize - from[i], from[j] - configs[j].minSize),
      );
      if (actual === 0) return;

      const next = [...from];
      next[i] = from[i] + actual;
      next[j] = from[j] - actual;
      setSizes(next);
      onLayout?.(next);
    },
    [onLayout],
  );

  const onHandleDragStart = useCallback(
    (handleIndex: number, clientPos: number) => {
      dragRef.current = {
        handleIndex,
        startPos: clientPos,
        startSizes: [...sizesRef.current],
      };
    },
    [],
  );

  const onHandleDrag = useCallback(
    (clientPos: number) => {
      if (!dragRef.current || !containerRef.current) return;
      const { handleIndex, startPos, startSizes } = dragRef.current;
      const containerSize =
        direction === "horizontal"
          ? containerRef.current.getBoundingClientRect().width
          : containerRef.current.getBoundingClientRect().height;
      if (containerSize === 0) return;
      applyDelta(
        handleIndex,
        ((clientPos - startPos) / containerSize) * 100,
        startSizes,
      );
    },
    [direction, applyDelta],
  );

  const onHandleDragEnd = useCallback(() => {
    dragRef.current = null;
  }, []);

  // For keyboard-driven resizing (1% steps)
  const resizePanels = useCallback(
    (handleIndex: number, deltaPercent: number) => {
      applyDelta(handleIndex, deltaPercent, sizesRef.current);
    },
    [applyDelta],
  );

  // Inject internal indices into direct Panel / Handle children
  let panelIdx = 0;
  let handleIdx = 0;
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.type === ResizablePanel)
      return cloneElement(child as ReactElement<ResizablePanelProps>, {
        _panelIndex: panelIdx++,
      });
    if (child.type === ResizableHandle)
      return cloneElement(child as ReactElement<ResizableHandleProps>, {
        _handleIndex: handleIdx++,
      });
    return child;
  });

  const contextValue: GroupContextValue = {
    direction,
    sizes,
    panelConfigs,
    containerRef,
    onHandleDragStart,
    onHandleDrag,
    onHandleDragEnd,
    resizePanels,
  };

  return (
    <ResizableGroupContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={`kd-resizable-group kd-resizable-group--${direction}${className ? ` ${className}` : ""}`}
        style={style}
      >
        {enhancedChildren}
      </div>
    </ResizableGroupContext.Provider>
  );
}
