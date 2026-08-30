import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Analytics from './pages/Analytics';
import Portfolio from './pages/Portfolio';
import CreateResume from './pages/CreateResume';

import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route path="/create-resume" element={<CreateResume />} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
