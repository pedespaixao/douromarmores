import { StrictMode, Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  state = { hasError: false, error: '' };
  static getDerivedStateFromError(e: Error) { return { hasError: true, error: e.message }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f1629', color: '#fff', fontFamily: 'system-ui', padding: 40, textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: 24, color: '#c9a961' }}>Erro ao carregar</h1>
            <p style={{ marginTop: 16, color: '#aaa', fontSize: 14 }}>{this.state.error}</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: 24, padding: '12px 28px', borderRadius: 999, background: '#c9a961', color: '#fff', border: 0, fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>Recarregar página</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
