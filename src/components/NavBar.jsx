import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCartStore, selectItemCount } from '../store/cartStore.js';

export default function NavBar({ theme, onToggleTheme }) {
  const { user, logOut } = useAuth();
  // a number (primitive): NavBar re-renders only when the count changes
  const itemCount = useCartStore(selectItemCount);

  return (
    <nav className="navbar">
      {/* NavLink adds the "active" class to the current link, no page reload */}
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart ({itemCount})</NavLink>

      <span className="spacer" />

      <button onClick={onToggleTheme}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>

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
