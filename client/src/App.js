import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './route/ProtectedRoute';
import UnprotectedRoute from './route/UnProtectedRoute';
import ROUTES_LIST from './route/routes';

import './App.css';

function App() {
  return (
    <div className='app'>
      <div className='blur blur-1'></div>
      <div className='blur blur-2'></div>
      <Routes>
        {ROUTES_LIST.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.key}
              element={
                route.isProtected ? (
                  <ProtectedRoute>
                    <route.element />
                  </ProtectedRoute>
                ) : (
                  <UnprotectedRoute>
                    <route.element />
                  </UnprotectedRoute>
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
