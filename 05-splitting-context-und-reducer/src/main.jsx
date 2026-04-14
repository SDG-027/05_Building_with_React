import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import ThemeProvider from './context/ThemeContext.jsx';
import BookingProvider from './context/BookingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider>*/}
      <BookingProvider>
        <App />
      </BookingProvider>
      {/* </ThemeProvider>*/}
    </BrowserRouter>
  </StrictMode>
);
