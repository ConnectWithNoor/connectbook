import { Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

import './App.css';
import ProtectedRoute from './route/ProtectedRoute';
import UnprotectedRoute from './route/UnProtectedRoute';

function App() {
  return (
    <div className='app'>
      <div className='blur blur-1'></div>
      <div className='blur blur-2'></div>
      <Routes>
        <Route
          path='/'
          element={
            <UnprotectedRoute>
              <Auth />
            </UnprotectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
