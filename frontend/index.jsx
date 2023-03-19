import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
// eslint-disable-next-line import/extensions
import App from './src/App.jsx';

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);