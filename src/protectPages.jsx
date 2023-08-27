import { useGlobalContext } from './context';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectPages = () => {
  const { number } = useGlobalContext();
  return number !== "" ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectPages;