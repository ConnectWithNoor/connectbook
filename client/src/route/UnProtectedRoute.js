import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UnprotectedRoute = ({ children }) => {
  const { authData } = useSelector((state) => state.authReducer);
  console.log(authData);
  if (!authData) return children;

  return <Navigate to='/home' />;
};

export default UnprotectedRoute;
