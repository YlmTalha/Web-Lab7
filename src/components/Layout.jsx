import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';

export default function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main className="content">
        <Outlet /> {/* the matched child page renders here */}
      </main>
      <footer className="footer">Online Shop - Web Programming Assignment 7</footer>
    </div>
  );
}
