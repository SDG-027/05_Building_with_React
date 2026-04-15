import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import TodoProvider from './context/TodoContext.jsx';
import TodoReducerProvider from './context/TodoReducerContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoReducerProvider>
      {/* <TodoProvider>ß*/}
      <App />
      {/* </TodoProvider>*/}
    </TodoReducerProvider>
  </StrictMode>
);
