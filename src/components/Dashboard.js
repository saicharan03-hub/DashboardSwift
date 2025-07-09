import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar'
import './Dashboard.css'
const PAGE_SIZES = [10, 50, 100];

export default function CommentsDashboard() {
  const [raw, setRaw]       = useState([]);
  const [pageSize, setSize] = useState(10);
  const [page, setPage]     = useState(1);
  const [query, setQuery]   = useState('');
  const [sort, setSort]     = useState({ key: null, dir: null });

  useEffect(() => { fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json()).then(setRaw); }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return raw.filter(c =>
      c.name.toLowerCase().includes(q)  ||
      c.email.toLowerCase().includes(q) ||
      c.body.toLowerCase().includes(q)
    );
  }, [raw, query]);

  const sorted = useMemo(() => {
    if (!sort.key || !sort.dir) return filtered;
    const dir = sort.dir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return -1 * dir;
      if (a[sort.key] > b[sort.key]) return  1 * dir;
      return 0;
    });
  }, [filtered, sort]);

  const pages     = Math.max(1, Math.ceil(sorted.length / pageSize));
  const curPage   = Math.min(page, pages);
  const pageSlice = sorted.slice((curPage-1)*pageSize, curPage*pageSize);

  const cycleSort = key =>
    setSort(s => s.key !== key
      ? { key, dir: 'asc' }
      : s.dir === 'asc'  ? { key, dir: 'desc' }
      : s.dir === 'desc' ? { key: null, dir: null }
      : { key, dir: 'asc' });

  const caret = k => sort.key === k ? (sort.dir === 'asc' ? '▲' : sort.dir === 'desc' ? '▼' : '') : '';

  return (
    <main className="dashboard">
      <Navbar />
      <div className="toolbar">
        <div className="sort-group">
          <button onClick={() => cycleSort('postId')}>Sort&nbsp;Post&nbsp;ID {caret('postId')}</button>
          <button onClick={() => cycleSort('name')}>Sort&nbsp;Name {caret('name')}</button>
          <button onClick={() => cycleSort('email')}>Sort&nbsp;Email {caret('email')}</button>
        </div>
        <input
          className="search-input"
          placeholder="Search name, email, comment"
          value={query}
          onChange={e => { setQuery(e.target.value); setPage(1); }}
        />
      </div>

      {/* table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Post ID</th><th>Name</th><th>Email</th><th>Comment</th></tr>
          </thead>
          <tbody>
            {pageSlice.map(c => (
              <tr key={c.id} className='tablerow'>
                <td>{c.postId}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.body}</td>
              </tr>
            ))}
            {!pageSlice.length && <tr><td colSpan={4} className="empty">No results</td></tr>}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="pagination">
        <span>{(curPage-1)*pageSize+1}-{Math.min(curPage*pageSize, sorted.length)} of {sorted.length}</span>
        <button disabled={curPage===1}            onClick={()=>setPage(p=>p-1)}>‹</button>
        {Array.from({length:pages},(_,i)=>i+1)
          .filter(p=>p===1||p===pages||Math.abs(p-curPage)<=1)
          .map(p=>(
            <button key={p} className={p===curPage?'active':''} onClick={()=>setPage(p)}>{p}</button>
          ))}
        <button disabled={curPage===pages}        onClick={()=>setPage(p=>p+1)}>›</button>
        <select value={pageSize} onChange={e=>{setSize(+e.target.value); setPage(1);}}>
          {PAGE_SIZES.map(s=><option key={s} value={s}>{s} / Page</option>)}
        </select>
      </div>
    </main>
  );
}
