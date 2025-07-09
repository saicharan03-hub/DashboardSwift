import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const uname = localStorage.getItem('username');     // just the saved username
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!uname) return;

      const list = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(r => r.json());

      const matched = list.find(u => u.username.toLowerCase() === uname.toLowerCase());
      setUser(matched);
    };

    fetchUser();
  }, [uname]);

  // derive initials from full name (e.g., "Sai Charan" -> SC)
  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-box">S</span>
        <span className="logo-text">WIFT</span>
      </Link>

      {user && (
        <Link to="/profile" className="user">
          <span className="avatar">{initials}</span>
          <span className="name">{user.name}</span>
        </Link>
      )}
    </header>
  );
}
