import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar            from './components/Navbar';
import Login             from './components/Login';
import CommentsDashboard from './components/Dashboard';
import Profile           from './components/ProfileSection';

/* ---- tiny auth helper ---- */
const getUser = () => JSON.parse(localStorage.getItem('user'));

const Private = ({ children }) =>
  getUser() ? children : <Navigate to="/login" replace />;

export default function App() {
  return (
    <>
      
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/profile"  element={<Private><Profile /></Private>} />
        <Route path="/"         element={<Private><CommentsDashboard /></Private>} />
        <Route path="*"         element={<Navigate to={getUser() ? '/' : '/login'} replace />} />
      </Routes>
    </>
  );
}
