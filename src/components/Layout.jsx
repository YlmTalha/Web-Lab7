import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export default function Layout() {
  // theme preference survives reloads through our custom hook
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main className="content">
        <Outlet /> {/* the matched child page renders here */}
      </main>
      <footer className="footer">Online Shop - Web Programming Assignment 7</footer>
    </div>
  );
}
