import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <nav style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '1rem',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
              Community<span style={{ color: 'var(--color-secondary)' }}>BNPL</span>
            </div>
            <div>
              {/* Menu placeholder */}
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-surface)', border: '1px solid rgba(255,255,255,0.1)' }}></div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
