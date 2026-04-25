import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@scope/resizable';

function Panel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="demo-panel">
      <span className="demo-panel__label">{label}</span>
      {hint && <span className="demo-panel__hint">{hint}</span>}
    </div>
  );
}

export default function App() {
  return (
    <div className="demo-root">
      <header className="demo-header">
        <h1>kd-resizable</h1>
        <p>
          Drag the handles to resize · Focus a handle and use arrow keys ·{' '}
          <code>withHandle</code> shows the grip badge
        </p>
      </header>

      <div className="demo-grid">
        {/* ── Horizontal ── */}
        <section className="demo-section">
          <h2>Horizontal</h2>
          <div className="demo-frame">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={30} minSize={15}>
                <Panel label="Sidebar" hint="min 15%" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70}>
                <Panel label="Content" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* ── Vertical ── */}
        <section className="demo-section">
          <h2>Vertical</h2>
          <div className="demo-frame">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={20}>
                <Panel label="Editor" hint="min 20%" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={40} minSize={15}>
                <Panel label="Console" hint="min 15%" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* ── Nested (IDE layout) ── */}
        <section className="demo-section demo-section--wide">
          <h2>Nested · IDE layout</h2>
          <div className="demo-frame">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={20} minSize={10}>
                <Panel label="Explorer" hint="min 10%" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={65} minSize={20}>
                    <Panel label="Editor" hint="min 20%" />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={35} minSize={10}>
                    <Panel label="Terminal" hint="min 10%" />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={20} minSize={10}>
                <Panel label="Outline" hint="min 10%" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* ── Three panels, plain handle ── */}
        <section className="demo-section demo-section--wide">
          <h2>Three panels · Plain handle</h2>
          <div className="demo-frame">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={33} minSize={10}>
                <Panel label="Column A" />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={34} minSize={10}>
                <Panel label="Column B" />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={33} minSize={10}>
                <Panel label="Column C" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>
      </div>
    </div>
  );
}
