import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import App from './src/app';
import { AuthProvider } from './src/contexts/AuthContext';

const root = createRoot(document.getElementById('root'));

root.render(
	<AuthProvider>
		<BrowserRouter>
			<App></App>
		</BrowserRouter>
	</AuthProvider>
);
