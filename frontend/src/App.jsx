import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PublicPortfolio from './pages/PublicPortfolio';

function PrivateRoute({ children }) {
  const token = useStore(state => state.token);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/p/:id" element={<PublicPortfolio />} />
        </Routes>
      </div>
    </Router>
  );
}
