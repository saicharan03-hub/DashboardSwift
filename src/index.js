import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';   //  ←  MUST be here
import App from './App';
                             //  your base styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />                                         {/* every <Link> lives inside */}
  </BrowserRouter>
);
