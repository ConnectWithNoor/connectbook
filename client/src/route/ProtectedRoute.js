import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { authData } = useSelector((state) => state.authReducer);
  if (authData) return children;

  return <Navigate to='/' state={{ from: location}}  replace/>;
};

export default ProtectedRoute;
