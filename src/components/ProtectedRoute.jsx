import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// UX only, not security: the code still runs in the browser and can be bypassed.
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // remember where the user wanted to go, replace so /cart is not left in history
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
