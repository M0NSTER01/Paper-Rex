import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Analytics from './pages/Analytics';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/portfolio/:id" element={<Portfolio />} />
    </Routes>
  );
}

export default App;
