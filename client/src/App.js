import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './route/ProtectedRoute';
import UnprotectedRoute from './route/UnProtectedRoute';
import ROUTES_LIST from './route/routes';

import AxiosAuthIntercept from './components/AxiosAuthIntercept';
import PersistAuth from './components/PersistAuth';

import './App.css';

function App() {

  return (
    <div className='app'>
      <div className='blur blur-1'></div>
      <div className='blur blur-2'></div>
      <Routes>
        <Route element={<AxiosAuthIntercept />} >
        <Route element={<PersistAuth />} >
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
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
