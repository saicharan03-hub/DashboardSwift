import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [err, setErr]           = useState('');
  const nav                     = useNavigate();

  // already logged‑in?  kick to dashboard
  if (localStorage.getItem('username')) nav('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    const list = await fetch('https://jsonplaceholder.typicode.com/users')
                  .then(r => r.json());
    const usr  = list.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!usr) { setErr('Username not found'); return; }

    localStorage.setItem('username', usr.username);     // ← save just the username
    localStorage.setItem('user', JSON.stringify(usr));  // optional: whole object
    nav('/');
  };

  return (
    <main className="login">
      <form onSubmit={handleSubmit} className="login__card">
        <h1>Sign in</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        {err && <p className="login__err">{err}</p>}

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
