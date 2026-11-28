import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SiteContentProvider } from './context/SiteContentContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <SiteContentProvider>
      <App />
    </SiteContentProvider>
  </ErrorBoundary>
);
