import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import TrustScoreExplainer from './pages/TrustScoreExplainer';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trust" element={<TrustScoreExplainer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
