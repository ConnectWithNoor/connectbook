import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { authData } = useSelector((state) => state.authReducer);
  if (authData) return children;

  return <Navigate to='/' />;
};

export default ProtectedRoute;
