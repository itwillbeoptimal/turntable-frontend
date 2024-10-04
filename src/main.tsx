import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import worker from './mocks/browser';

async function deferRender() {
  if (!import.meta.env.DEV) {
    return;
  }
  await worker.start();
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
