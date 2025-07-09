import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './ProfileSection.css';
import Navbar from '../components/Navbar'

export default function Profile() {
  /* 1. hooks come first  */
  const uname = localStorage.getItem('username');
  const nav   = useNavigate();
  const [user, setUser] = useState(null);

  /* 2. side‑effect can bail early inside itself */
  useEffect(() => {
    if (!uname) return;                       // guard inside the hook
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(list =>
        setUser(list.find(u =>
          u.username.toLowerCase() === uname.toLowerCase()
        ))
      );
  }, [uname]);

  /* 3. render‑time guards come AFTER all hooks */
  if (!uname) return <Navigate to="/login" replace />;
  if (!user)   return <main className="profile">Loading…</main>;

  const initials = uname
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="profile">
      <Navbar />
      <button className="profile__back" onClick={() => nav(-1)}>
        ← Back
      </button>

      <section className="profile__card">
        <div className="profile__header">
          <div className="profile__avatar">{initials}</div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile__grid">
          <label>User&nbsp;ID   <input readOnly value={user.id} /></label>
          <label>Name          <input readOnly value={user.name} /></label>
          <label>Username      <input readOnly value={user.username} /></label>
          <label>Email&nbsp;ID <input readOnly value={user.email} /></label>
          <label>Address
            <input readOnly
              value={`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
            />
          </label>
          <label>Phone         <input readOnly value={user.phone} /></label>
        </div>
      </section>
    </main>
  );
}
