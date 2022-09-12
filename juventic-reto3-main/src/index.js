import React from 'react';
import ReactDOM from 'react-dom';
import { CartProvider } from './contexts/cartContext';
import { LoginProvider } from './contexts/loginContext';

import 'bootstrap/dist/js/bootstrap';
import './css/styles.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
