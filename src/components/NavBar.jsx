import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { user, logOut } = useAuth();

  return (
    <nav className="navbar">
      {/* NavLink adds the "active" class to the current link, no page reload */}
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>

      <span className="spacer" />

      {user ? (
        <>
          <span>{user.username}</span>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}
