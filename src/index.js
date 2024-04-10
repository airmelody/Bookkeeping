import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import sum from '@/test'
import './theme.css'
import { Provider } from 'react-redux';
import store from './store';

const total = sum(1,2)
console.log('[ total ] >', total)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <App />
  <Provider store={ store }>
    <RouterProvider router={router} />
  </Provider>
);

