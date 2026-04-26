import {
  useState,
  useRef,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
  type ReactElement,
} from "react";
import { KdResizableGroupContext } from "./context";
import { KdResizablePanel } from "./kd-resizable-panel";
import { KdResizableHandle } from "./kd-resizable-handle";
import type {
  KdResizablePanelGroupProps,
  KdResizablePanelProps,
  KdResizableHandleProps,
  KdGroupContextValue,
  KdPanelConfig,
} from "./types";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function KdResizablePanelGroup({
  direction = "horizontal",
  className,
  style,
  children,
  onLayout,
}: KdResizablePanelGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive panel metadata from children at render time
  const childArray = Children.toArray(children) as ReactElement[];
  const panelElements = childArray.filter(
    (child) => isValidElement(child) && child.type === KdResizablePanel,
  );

  const panelConfigs: KdPanelConfig[] = panelElements.map((child) => ({
    minSize: (child.props as KdResizablePanelProps).minSize ?? 0,
    maxSize: (child.props as KdResizablePanelProps).maxSize ?? 100,
  }));

  // Always-current ref so callbacks never capture stale config
  const panelConfigsRef = useRef(panelConfigs);
  panelConfigsRef.current = panelConfigs;

  const [sizes, setSizes] = useState<number[]>(() =>
    panelElements.length === 0
      ? []
      : panelElements.map(
          (child) =>
            (child.props as KdResizablePanelProps).defaultSize ??
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
      // startSizes captured at drag start; delta is always relative to origin — prevents drift.
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
    if (child.type === KdResizablePanel)
      return cloneElement(child as ReactElement<KdResizablePanelProps>, {
        _panelIndex: panelIdx++,
      });
    if (child.type === KdResizableHandle)
      return cloneElement(child as ReactElement<KdResizableHandleProps>, {
        _handleIndex: handleIdx++,
      });
    return child;
  });

  const contextValue: KdGroupContextValue = {
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
    <KdResizableGroupContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={`kd-resizable-group kd-resizable-group--${direction}${className ? ` ${className}` : ""}`}
        style={style}
      >
        {enhancedChildren}
      </div>
    </KdResizableGroupContext.Provider>
  );
}
